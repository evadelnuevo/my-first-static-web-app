import Route from '@ember/routing/route';

export default class extends Route {
  async model() {
    var req = new Request('/.auth/me', {
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
        return { name };
      } else if (resp.status === 401) {
        console.log('user not logged in');
      }
    } catch (e) {
      console.log('error checking user status');
    }
  }
}
