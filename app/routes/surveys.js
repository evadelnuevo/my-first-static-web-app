import Route from '@ember/routing/route';

export default class extends Route {
  async model() {
    var req = new Request('https://localhost:41086/api/surveys', {
      headers: new Headers({
        'X-CSRF': '1',
      }),
    });

    try {
      var resp = await fetch(req);
      if (resp.ok) {
        let surveys = await resp.json();
        console.log('surveys', surveys);
        return surveys;
      } else {
        console.log('Glu API Result: ' + resp.status);
      }
    } catch (e) {
      console.log('Error calling Glu API');
    }
  }
}
