<template>
	<view class="index">
		<!-- <block v-for="(item, index) in list" :key="index">
			<view class="card" @click="goDetail(item)">
				<image class="card-img" :src="item.img_src" mode="aspectFill"></image>
				<text class="card-num-view">{{item.img_num}}P</text>
				<view class="card-bottm row">
					<view class="car-title-view row">
						<text class="card-title">{{item.title}}</text>
					</view>
					<view @click.stop="share(item)" class="card-share-view"></view>
				</view>
			</view>
		</block> -->
		<view v-for="(value,index) in list" :key="index">
			<view class="y-list">
			    <icon type="success" size="26"/>
				<view class="">
					<text>{{value.title}}</text>
					 <text>{{value.dec}}</text>
				</view>
			</view>
		</view>
		
		
		<text class="icon iconfont icon-huiyuanxitong">r435</text>
		<block v-for="(item, index) in list" :key="index">
		
			<image src="{{}}item" mode=""></image>
			<view class="list-card" @click="goDetail(item)">
				<view class="list-title">
					<view class="list-icon- row">
						<text class="card-title">{{item.title}}</text>
						<text class="card-time">{{item.time}}</text>
					</view>
					<view >
						<text class="card-tip">{{item.dec}}</text>
					</view>
				</view>
			</view>
		</block>
		<text class="loadMore">加载中...</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				refreshing: false,
				providerList: [],
				list:[{
					title:"预警消息",
					time:"2021-07-14",
					dec:"项目预警状况",
					icon:"new_yj.png"
				},{
					title:"系统消息",
					time:"2021-07-14",
					dec:"系统通知蕾消息",
					icon:"new_yj.png"
				},{
					title:"任务消息",
					time:"2021-07-14",
					dec:"任务通知蕾消息",
					icon:"new_yj.png"
				}],
				fetchPageNum: 1
			}
		},
		onLoad() {
			this.getData();
			uni.getProvider({
				service: "share",
				success: (e) => {
					let data = []
					for (let i = 0; i < e.provider.length; i++) {
						switch (e.provider[i]) {
							case 'weixin':
								data.push({
									name: '分享到微信好友',
									id: 'weixin'
								})
								data.push({
									name: '分享到微信朋友圈',
									id: 'weixin',
									type: 'WXSenceTimeline'
								})
								break;
							case 'qq':
								data.push({
									name: '分享到QQ',
									id: 'qq'
								})
								break;
							default:
								break;
						}
					}
					this.providerList = data;
				},
				fail: (e) => {
					console.log("获取登录通道失败", e);
				}
			});
		},
		onReachBottom() {
            console.log("滑动到页面底部")
			this.getData();
		},
		onPullDownRefresh() {
			console.log("下拉刷新");
			this.refreshing = true;
			this.getData();
		},
		methods: {
			getData() {
				uni.request({
					url: this.$serverUrl + '/api/picture/posts.php?page=' + (this.refreshing ? 1 : this.fetchPageNum) + '&per_page=5',
					success: (ret) => {
						console.log("data",ret);
						if (ret.statusCode !== 200) {
							console.log("失败!");
						} else {
							if (this.refreshing && ret.data[0].id === this.list[0].id) {
								uni.showToast({
									title: "已经最新",
									icon: "none",
								})
								this.refreshing = false;
								uni.stopPullDownRefresh();
								return;
							}
							if (this.refreshing) {
								this.refreshing = false;
								uni.stopPullDownRefresh()
								this.list = ret.data;
								this.fetchPageNum = 2;
							} else {
								this.list = this.list.concat(ret.data);
								this.fetchPageNum += 1;
							}
						}
					}
				});
			},
			goDetail(e) {
				uni.navigateTo({
					url:"../detail/detail?data=" + encodeURIComponent(JSON.stringify(e))
				})
			},
			share(e) {
				if (this.providerList.length === 0) {
					uni.showModal({
						title: "当前环境无分享渠道!",
						showCancel: false
					})
					return;
				}
				let itemList = this.providerList.map(function (value) {
					return value.name
				})
				uni.showActionSheet({
					itemList: itemList,
					success: (res) => {
						uni.share({
							provider: this.providerList[res.tapIndex].id,
							scene: this.providerList[res.tapIndex].type && this.providerList[res.tapIndex].type === 'WXSenceTimeline' ? 'WXSenceTimeline' : "WXSceneSession",
							type: 0,
							title:"uni-app模版",
							summary: e.title,
							imageUrl:e.img_src,
							href:"https://uniapp.dcloud.io",
							success: (res) => {
								console.log("success:" + JSON.stringify(res));
							},
							fail: (e) => {
								uni.showModal({
									content: e.errMsg,
									showCancel:false
								})
							}
						});
					}
				})
			}
		}
	}
</script>

<style>
@import url("/static/icon/iconfont/iconfont.css");
@import url("/static/css/newList.css");
</style>
