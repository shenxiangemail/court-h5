import App from '../App.vue'
import Select from '../views/select.vue'
import bottom from '../components/bottom.vue'
import indexApp from '../views/indexApp.vue'
import newsList from '../views/newsList.vue'
import unitList from '../views/unitList.vue'
import login from '../views/login.vue'
import newsDetail from '../views/newsDetail.vue'
import softwareDownload from '../views/softwareDownload.vue'
import imageShare from '../views/imageShare.vue'
import department from '../views/department.vue'
import announcement from '../views/announcement.vue'


const router = [{ 
		path: '/login',
		name: 'login',
		component: login, //登录
	},{
		path: '/',
		component: indexApp, //首页
	},{
		path: '/select',
		name: 'select',
		component: Select, //查询页面
	}, {
		path: '/newsList',
		name: 'newsList',
		component: newsList, //新闻列表
	}, {
		path: '/unitList',
		name: 'unitList',
		component: unitList, //部门列表
	}, {
		path: '/newsDetail',
		name: 'newsDetail',
		component: newsDetail, //新闻详情（暂时没有使用）
	}, {
		path: '/softwareDownload',
		name: 'softwareDownload',
		component: softwareDownload, //软件下载
	}, {
		path: '/imageShare',
		name: 'imageShare',
		component: imageShare, //美图共享
	}, {
		path: '/department',
		name: 'department',
		component: department, //部门园地
	}, {
		path: '/announcement',
		name: 'announcement',
		component: announcement, //公告
	}
]
export default router
