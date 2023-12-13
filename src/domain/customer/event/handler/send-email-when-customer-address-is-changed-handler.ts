import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class SendEmailWhenCustomerAddressIsChangedHandler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log(
      `Customer address: ${event.eventData.id}, ${event.eventData.name} changed to: ${event.eventData.address}`
    );
  }
}
