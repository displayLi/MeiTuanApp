import Goods from '@/components/goods/Goods'
import Ratings from '@/components/ratings/Ratings'
import Seller from '@/components/seller/Seller'

export const routes = [
    {path:'/goods',component:Goods},
    {path:'/ratings',component:Ratings},
    {path:'/seller',component:Seller},
    {path:'*',redirect:'/goods'}
] 
