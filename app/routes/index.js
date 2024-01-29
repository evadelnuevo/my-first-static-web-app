import Route from '@ember/routing/route';

export default class extends Route {
  async model() {
    var req = new Request('/bff/user', {
      headers: new Headers({
        'X-CSRF': '1',
      }),
    });

    try {
      var resp = await fetch(req);
      if (resp.ok) {
        let userClaims = await resp.json();
        console.log('user logged in', userClaims);

        let name = userClaims.find(({ type }) => type === 'name').value;
        var logoutUrl = userClaims.find(
          ({ type }) => type === 'bff:logout_url'
        ).value;

        return { name, logoutUrl };
      } else if (resp.status === 401) {
        console.log('user not logged in');
      }
    } catch (e) {
      console.log('error checking user status');
    }
  }
}
