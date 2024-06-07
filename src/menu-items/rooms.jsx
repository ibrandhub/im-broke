// assets
import { HomeOutlined } from '@ant-design/icons';

// icons
const icons = {
  HomeOutlined
};

// ==============================|| MENU ITEMS - CUSTOMER ||============================== //

const rooms = {
  id: 'group-rooms',
  title: 'Management',
  type: 'group',
  children: [
    {
      id: 'rooms',
      title: 'Rooms',
      type: 'item',
      url: '/rooms',
      icon: icons.HomeOutlined,
      breadcrumbs: false
    }
  ]
};

export default rooms;
