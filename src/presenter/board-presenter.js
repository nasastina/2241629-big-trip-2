import NewFormView from '../view/creation-form-view.js';
import EditFormView from '../view/edit-form-view.js';
import WaypointListView from '../view/waypoint-list-view.js';
import {render} from '../render.js';
import SortView from '../view/sort-view.js';
import TripEventsView from '../view/trip-events-view.js';


export default class BoardPresenter {
  tripEventsView = new TripEventsView();
  tripEventsListView = new TripEventsListView();

  constructor({container, pointsModel}) {
    this.container = container;
    this.pointsModel = pointsModel;
  }

  init() {
    this.pointsModels = this.pointsModel.points;
    this.pointsDestinations = this.pointsModel.tripDestinations;
    this.pointOffersByTypes = this.pointsModel.offersByType;

    this.pointsModels.forEach((points) => {
      render(new TripEventsItemView({ point: points, tripDestinations: this.pointsDestinations, mockOffers: this.pointOffersByTypes}), this.tripEventsListView.getElement());
    });

    render(new SortView(), this.tripEventsView.getElement());
    render(new EditFormView({point: this.pointsModels[0], tripDestinations: this.pointsDestinations, mockOffers: this.pointOffersByTypes}), this.tripEventsListView.getElement(), RenderPosition.AFTERBEGIN);
    render(this.tripEventsListView, this.tripEventsView.getElement());
    render(this.tripEventsView, this.container);
  }
}
