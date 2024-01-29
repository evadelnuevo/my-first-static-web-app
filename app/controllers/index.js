import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class CapiInterviewersController extends Controller {
  @action
  login() {
    window.location = "/bff/login";
  }
}
