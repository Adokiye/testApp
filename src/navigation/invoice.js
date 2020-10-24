import { createStackNavigator } from 'react-navigation-stack';
import { fromRight } from 'react-navigation-transitions';
import CreateCustomer from '../Screens/CreateCustomer';
import EditCustomer from '../Screens/EditCustomer';
import CreateInvoice from '../Screens/CreateInvoice';
import InputInvoiceDetails from '../Screens/InputInvoiceDetails';
import InvoiceRecipients from '../Screens/InvoiceRecipients';
import Invoice from '../Screens/Invoice';
import InvoicePreviewer from '../Screens/InvoicePreviewer';

const InvoiceStack = createStackNavigator(
  {
    Invoice: Invoice,
    CreateInvoice: CreateInvoice,
    CreateCustomer: CreateCustomer,
    EditCustomer: EditCustomer,
    InputInvoiceDetails: InputInvoiceDetails,
    InvoiceRecipients: InvoiceRecipients,
    InvoicePreviewer: InvoicePreviewer,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Invoice',
    transitionConfig: () => fromRight(),
  },
);

export default InvoiceStack;
