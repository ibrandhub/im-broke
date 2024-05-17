// assets
import { UserOutlined } from '@ant-design/icons';

// icons
const icons = {
  UserOutlined
};

// ==============================|| MENU ITEMS - CUSTOMER ||============================== //

const customer = {
  id: 'group-customer',
  title: 'Management',
  type: 'group',
  children: [
    {
      id: 'customer',
      title: 'Customer',
      type: 'item',
      url: '/customer',
      icon: icons.UserOutlined,
      breadcrumbs: false
    }
  ]
};

export default customer;
