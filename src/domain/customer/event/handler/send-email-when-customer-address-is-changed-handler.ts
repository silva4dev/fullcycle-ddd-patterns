import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerChangedAddressEvent from "../customer-changed-address-event";

export default class SendEmailWhenCustomerAddressIsChangedHandler
  implements EventHandlerInterface<CustomerChangedAddressEvent>
{
  handle(event: CustomerChangedAddressEvent): void {
    console.log(
      `Customer address: ${event.eventData.id}, ${event.eventData.name} changed to: ${event.eventData.address}`
    );
  }
}
