// assets
import { DingdingOutlined } from '@ant-design/icons';

// icons
const icons = {
  DingdingOutlined
};

// ==============================|| MENU ITEMS - CUSTOMER ||============================== //

const ranking = {
  id: 'group-ranking',
  title: 'Management',
  type: 'group',
  children: [
    {
      id: 'ranking',
      title: 'Ranking',
      type: 'item',
      url: '/ranking',
      icon: icons.DingdingOutlined,
      breadcrumbs: false
    }
  ]
};

export default ranking;
