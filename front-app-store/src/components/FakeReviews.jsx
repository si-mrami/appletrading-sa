import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import CheckIcon from '@mui/icons-material/Check';
import moment from 'moment';
import 'moment/locale/ar';
import manager from '../Assets/manager.png';
import manager2 from '../Assets/manager2.png';
import './styles.scss';
import Carousel from 'react-bootstrap/Carousel';


const useStyles = makeStyles((theme) => ({
	reviewContainer: {
		maxWidth: '400px',
		margin: '0 auto',
		// padding: '1rem',
	},
	review: {
		display: 'flex',
		flexDirection: 'row-reverse',
		marginBottom: theme.spacing(0),
		padding: theme.spacing(2),
	},
	reviewerImage: {
		width: theme.spacing(10),
		height: theme.spacing(10),
		marginRight: theme.spacing(2),
	},
	reviewerInfo: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-end',
	},
	reviewHeader: {
		textAlign: 'right',
		color: '#6F3091',
		fontSize: '20px',
	},
	purchaseAndRating: {
		display: 'flex',
		flexDirection: 'row-reverse',
		alignItems: 'center',
		marginTop: theme.spacing(1),
	},
	purchaseInfo: {
		display: 'flex',
		alignItems: 'center',
		backgroundColor: '#FFCD3C',
		borderRadius: '10px',
		padding: '5px',
		fontWeight: 'bolder',
	},
	checkIcon: {
		color: 'black',
	},
	ratingInfo: {
		fontSize: '20px',
		marginRight: theme.spacing(1),
	},
	stars: {
		marginTop: theme.spacing(1),
		textAlign: 'right',
	},

	reviewTime: {
		fontSize: '14px',
		color: '#777',
		textAlign: 'right',
		marginTop: theme.spacing(1),
		fontWeight: 'bolder',
	},
}));

const Reviews = () => {
	const classes = useStyles();


	const reviews = [
		{
			reviewer: 'Nayyar Al-Omari',
			purchase: true,
			rating: 5,
			text: 'طلبت من عندهم بالليل ووصل الطلب اليوم الثاني الظهر سرررعه في التوصيل ماشاء الله 😍👏👏👏',
			time: 'مند يومين',
			avatar: manager2,
		},
		{
			reviewer: 'وقاص آل علي ',
			purchase: true,
			rating: 5,
			text: 'بصراحة وصلني الطلب ب اسرع وقت ممكن كنت اتخيلة والجهاز فخم مرة شكراً لكم على سرعة التوصيل وان شاء الله مو اخر مرة اطلب منكم',
			time: 'مند 4 ايام',
			avatar: manager2,
		},
		{
			reviewer: 'Young Al Faisal',
			purchase: true,
			rating: 5,
			text: 'منتجاتهم أصليه صراحه أنصح الناس تشتري من عندهم اجهزتهم ممتازه شكراً لكم 🥰❤️',
			time: 'مند 3 ايام',
			avatar: manager2,
		},
		{
			reviewer: 'يامن آل سعود',
			purchase: true,
			rating: 5,
			text: 'ما شاء الله تبارك الرحمن افضل متجر طلبت منهم اجهزة اشكر كل من ساهم في عمل هذا المتجر شكرا  و شكرا خاص إلى خدمة العملاء',
			time: 'مند يومين',
			avatar: manager2,
		},
		{
			reviewer: ' Yazid Al Sheikh Mubarak',
			purchase: true,
			rating: 5,
			text: 'الجهاز وصلني نفس الوصف سهل الاستخدام و شكله جميل و سعره مرره مناسب ارخص من السوق و المواقع الثانية و مواصفاته افضل من اغلب المنتجات المشابهة .. التوصيل سريع .. انصحكم فيه',
			time: 'مند يوم',
			avatar: manager2,
		},
		{
			reviewer: ' أيهم آل الشيخ',
			purchase: true,
			rating: 5,
			text: 'الف شكر لكم منتج اصلي وبسعر اقل من السوق مع ضمان الوكيل ... وباذن الله تعاملي معكم مستمر',
			time: 'مند يوم',
			avatar: manager2,
		},
		{
			reviewer: 'Adham Al-Shuaibi',
			purchase: true,
			rating: 5,
			text: 'المتجر فوق الممتاز قليل فيه 5 نجمات شكراً على تعاملهم',
			time: 'مند شهر',
			avatar: manager2,
		},
		{
			reviewer: ' أصيل الملا',
			purchase: true,
			rating: 5,
			text: 'المتجر اكثر من ممتاز 👌 سعر مميز ماشاء الله والمنتج يستاهل كل ريال ينحط فيه',
			time: 'مند اسبوع',
			avatar: manager2,
		},
		{
			reviewer: ' Ash Shaflot',
			purchase: true,
			rating: 5,
			text: 'شكراً لكل الطاقم العاملين على هذا المتجر على قولتهم ولا غلطه وملتزمين بمواعيد الشحن و اسعارهم خيالية وجودة عالية',
			time: 'مند 3 ايام',
			avatar: manager2,
		},
		{
			reviewer: ' أمجد التعلي',
			purchase: true,
			rating: 5,
			text: 'متجر فريد من نوعه و ان شاء الله مو اخر تعامل راح اخذ منكم منتجات واجهزة  ماقصرتو حقيقة 🌹',
			time: 'مند يوم',
			avatar: manager2,
		},
		{
			reviewer: ' Iyas Al-Enezi',
			purchase: true,
			rating: 5,
			text: 'أفضل متجر سرعه بالرد وصلني الجهاز في وقت قياسي شكراً لكم',
			time: 'مند 3 ايام',
			avatar: manager2,
		},
		{
			reviewer: 'إلياس السبيعي ',
			purchase: true,
			rating: 5,
			text: 'الشكر موصول للفريق المذهل في المتجر شكرا لكم وصلني الجهاز .',
			time: 'مند يومين',
			avatar: manager2,
		},
		{
			reviewer: ' Aws Al-Bishi',
			purchase: true,
			rating: 5,
			text: 'تستاهلون والله مليون نجمه تعاملكم خيالي خدمه مميزه',
			time: 'مند 4ايام',
			avatar: manager2,
		},
		{
			reviewer: ' آصف الغامدي',
			purchase: true,
			rating: 5,
			text: 'الله يعزكم انت افضل متجر قد شريت منه اسعاركم رهيببببببببب 🤘',
			time: 'مند يوم',
			avatar: manager2,
		},
		{
			reviewer: 'Elijah Al-Maliki ',
			purchase: true,
			rating: 5,
			text: 'انصحكم بتعامل معهم الحقيقة الجهاز وصلني مع كامل ملحقات الجهاز كامل بدون نقص افضل متجر الصراحه',
			time: 'مند يومين',
			avatar: manager2,
		},
		// {
		// 	reviewer: ' إبراهيم الدوسري ',
		// 	purchase: true,
		// 	rating: 5,
		// 	text: 'توصيل سريع وخدمة ممتازة وسعر منافس بأختصار من أفضل المتاجر اللي تعاملت معهم',
		// 	time: '2023/12/09',
		// 	avatar: manager2,
		// },
		// {
		// 	reviewer: ' Safaa Tojanni ',
		// 	purchase: true,
		// 	rating: 5,
		// 	text: 'تجربة جميلة وأسعار ممتازة ومتجر يوفر منتجات وعروض متميزة وما راح تكون اخر تجربة الله يوفقهم',
		// 	time: '2023/12/11',
		// 	avatar: manager,
		// },
		// {
		// 	reviewer: ' Yasser Al-Shahrani',
		// 	purchase: true,
		// 	rating: 5,
		// 	text: 'دايما اتعامل معاهم ممتازين في التعامل وسرعة في التوصيل وجودة في المنتجات',
		// 	time: '2023/11/10',
		// 	avatar: manager2,
		// },
		// {
		// 	reviewer: 'باهر الشهري ',
		// 	purchase: true,
		// 	rating: 5,
		// 	text: 'من أفضل المتاجر الي تعاملت معاهم اسعار منافسه الله يرزقهم من واسع فضله',
		// 	time: '2023/10/13',
		// 	avatar: manager2,
		// },
		// {
		// 	reviewer: 'Basil Al-Tuwaijri',
		// 	purchase: true,
		// 	rating: 5,
		// 	text: 'ماشاء الله متجر ممتاز و اسعارهم معقوله و جميلة وسرعة التوصيل',
		// 	time: '2023/10/13',
		// 	avatar: manager2,
		// },
		// {
		// 	reviewer: ' بهاء العلياني ',
		// 	purchase: true,
		// 	rating: 5,
		// 	text: '',
		// 	time: '2023/11/17',
		// 	avatar: manager2,
		// },
		// {
		// 	reviewer: '  Baybars Al-Ajami ',
		// 	purchase: true,
		// 	rating: 5,
		// 	text: 'ثاني تجربة لي وحقيقي تعامل وسرعة اكثر من رائعة',
		// 	time: '2023/10/13',
		// 	avatar: manager2,
		// },
		// {
		// 	reviewer: 'Samia El-Qassri',
		// 	purchase: true,
		// 	rating: 5,
		// 	text: 'متجر رائع و جميل والأسعار افضل من المواقع الأخرى 🫶',
		// 	time: '2023/12/09',
		// 	avatar: manager,
		// },
		// {
		// 	reviewer: 'بطرس بن عون ',
		// 	purchase: true,
		// 	rating: 5,
		// 	text: '',
		// 	time: '2023/12/10',
		// 	avatar: manager2,
		// }, {
		// 	reviewer: 'Tamer Al-Toum',
		// 	purchase: true,
		// 	rating: 5,
		// 	text: 'تم تجربة المتجر اكثر من مرة يشكرون على سهولة الطلب وسرعة التوصيل',
		// 	time: '2023/12/10',
		// 	avatar: manager2,
		// }, {
		// 	reviewer: 'تليد بغلف ',
		// 	purchase: true,
		// 	rating: 5,
		// 	text: 'تجربة ممتازة يعطيكم العافية وعروض بالفعل مميزة ومنتجات بالضمان واصلية حقيقة انصح بالتعامل مع المتاجر التي تقدر وتحترم العميل في التعامل والضمان والمصداقية وفقكم الله',
		// 	time: '2023/12/10',
		// 	avatar: manager2,
		// },
		// {
		// 	reviewer: 'thabit Al-Yabisi',
		// 	purchase: true,
		// 	rating: 5,
		// 	text: 'تجربة ممتازة ومنتجات أصلية وعروض رائعة والملفت سرعة التوصيل شكرا لكم 💙',
		// 	time: '2023/12/12',
		// 	avatar: manager2,
		// },
	];


	const getTimeAgo = (date) => {
		moment.locale('ar');
		return moment(date).fromNow();
	};

	return (
		<div className='review'>
			<h1>أراء العملاء</h1>
			<div className="reviewBody">
				<Carousel className='slide' data-bs-theme="dark">
					{reviews.map((review, index) => (
						<Carousel.Item>
							<div className="bodyItem">
								<div className="bodyLeft">
									<div className="left">
										<div className={classes.reviewHeader}>
											<h4>{review.reviewer}</h4>
										</div>
										<div className={classes.purchaseAndRating}>
											<Box className={classes.purchaseInfo}>
												<Typography variant="body3">قام بالشراء</Typography>
												<CheckIcon className={classes.checkIcon} />
											</Box>
											<Box className={classes.ratingInfo}>
												<Typography variant="body3">تم التقييم</Typography>
											</Box>
										</div>
										<div className={classes.stars}>
											<Rating value={review.rating} readOnly size="small" />
										</div>
									</div>
									<div className="right">
										<img src={review.avatar} alt="Reviewer Avatar" />
									</div>
								</div>
								<div className="bodyCenter">
									<span>{review.text}</span>
								</div>
								<div className="bodyRight">
									<div className={classes.reviewTime}>
										{review.time}
									</div>
								</div>
							</div>
						</Carousel.Item>
					))}
				</Carousel>
			</div>
		</div>
	);
};

export default Reviews;
