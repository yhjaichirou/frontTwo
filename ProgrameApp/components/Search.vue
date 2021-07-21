<template>
	<div class="search-box">
		<span class="search-box-type">{{companyText}}</span>

		<div class="type-select">
			<el-select v-model="value" placeholder="请选择">
				<el-option size="samll" v-for="item in roleList" :key="item.index" :label="item.name" :value="[item.id,item.name]">
				</el-option>
			</el-select>
		</div>
		<span class="search-box-cycle">{{cycleText}}</span>
		<!--  <van-radio-group class="search-box-radio" v-model="radio">
    <van-button :name="item" v-for='(item,index) in list' :key="index" @click="select(item)">{{item}}</van-button>
  </van-radio-group>-->
		<ul class="search-box-radio">
			<li v-for="(item,index) in list" :key="index" :class="{checked:index==n}" @click="changeList(index)">{{item}}</li>
		</ul>
		<div class="search-box-calendar">
			<van-cell :value="date" @click="clickTime" />
			<van-calendar v-model="show" get-container="body" type="range" @confirm="onConfirm" />
			<span class="iconfont icon-riqi1"></span>
		</div>
		<div class="search-box-btn" @click="onsure">{{buttonText}}</div>
	</div>
</template>

<script>
	export default {
		name: "Search",
		props: {
			data: {
				type: [Array, Object, String, Boolean, Number],
				default: () => {
					return {}
				}
			},
			roleList: {
				type: Array,
				default: () => {
					return []
				}
			},
			companyText: {
				type: String,
				default: '',
			},
			/*searchText:{
			  type:Boolean,
			  default:true
			},*/
			cycleText: {
				type: String,
				default: () => [] // 默认值是空数组
			},
			buttonText: {
				type: String,
				default: () => [] // 默认值是空数组
			},

		},
		data() {
			return {

				list: ['年度', '月度', '自定义'], //模拟数据
				n: 0,
				date: '',
				show: false,
				value: null,
				beginTime: new Date(),
				endTime: new Date(),


			}
		},
		methods: {
			clickTime: function() {
				if (this.n === 2) {
					this.show = true;
					console.log('clickTime' + this.n + this.show, this.beginTime, this.endTime)
				} else {
					this.show = false;
				}
			},




			onsure() {
				let data = {
					start: this.beginTime,
					end: this.endTime,
					select: this.value,
				}
				console.log(data);
				if(this.beginTime == '' || this.endTime == ''){
					this.toast('请选择统计时间')
					return false;
				}
				if (!this.value) {
					this.toast('请选择统计单位')
					return

				}
				this.$emit('sureClick', data)
			},
			changeList(index) {
				this.n = index; //this指向app

				if (this.n == 1) {

					this.beginTime = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
					this.endTime = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
					this.beginTime = this.beginTime.format("yyyy-MM-dd");
					this.endTime = this.endTime.format("yyyy-MM-dd");
					this.date = this.beginTime + '至' + this.endTime
				} else if (this.n == 0) {
					this.beginTime = new Date(new Date().getFullYear(), 0, 1);
					this.endTime = new Date(new Date().getFullYear(), 11, 31);
					this.beginTime = this.beginTime.format("yyyy-MM-dd");
					this.endTime = this.endTime.format("yyyy-MM-dd");
					this.date = this.beginTime + '至' + this.endTime
				} else {
					this.beginTime = '';
					this.endTime = '';
					this.date = '';
					// this.toast('请选择统计时间')
					this.onConfirm()
				}

			},
			formatDate(date) {
				return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
			},
			onConfirm(date) {
				const [start, end] = date;
				console.log(start)
				this.beginTime = start.format("yyyy-MM-dd");
				this.endTime = end.format("yyyy-MM-dd");
				this.show = false;
				this.date = this.beginTime + '至' + this.endTime
			},

		},



		//生命周期 - 创建完成（访问当前this实例）
		created() {

		},
		//生命周期 - 挂载完成（访问DOM元素）
		mounted() {
			this.beginTime = new Date(new Date().getFullYear(), 0, 1);
			this.endTime = new Date(new Date().getFullYear(), 11, 31);

			this.date = [this.beginTime, this.endTime]
			this.onConfirm(this.date)

			console.log('clickTime' + this.n + this.show, this.beginTime, this.endTime)
			console.log(this.$data)
		}

	}
</script>

<style lang="stylus" scoped>
	.search-box {
		display: flex;
		flex-direction: column;
		padding: 48px 32px 63px 32px;
		background-color: #FFFFFF;
	}

	.search-box-type {
		display: flex;
		flex: 1;
		margin-bottom: 8px;
		line-height: 17px;
		color: rgba(51, 51, 51, 100);
		font-size: 14px;
		text-align: left;
	}

	.type-select {
		appearance: none;
		-moz-appearance: none;
		-webkit-appearance: none;
	}

	.search-box-cycle {
		margin: 36px 0 10px 0;
		line-height: 17px;
		color: rgba(51, 51, 51, 100);
		font-size: 14px;
		text-align: left;
	}

	.search-box-radio {
		display: flex;
		flex: 1;
		flex-direction: row;
		justify-content: flex-start;
		background-color: #fff;
		color: #524e4e;
		font-size: 14px;
		text-align: center;
	}

	.search-box-radio li {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 70px;
		height: 32px;
		text-align: center;
		line-height: 20px;
		border: 1px solid #ededed;
		border-radius: 3px 0 0 3px;
	}

	.search-box-radio li:last-child {
		border-radius: 0 3px 3px 0;
	}

	.search-box-radio li:nth-child(2) {
		border-left: none;
		border-right: none;
		border-radius: 0;
	}

	li.checked:before {
		background-color: #ffffff;
		color: black;
	}

	li.checked {
		color: #ffffff;
		background-color: #3A75C5;
		border-color: #3A75C5;
	}

	.search-box-btn {
		margin-top: 63px;
		display: flex;
		flex: 1;
		justify-content: center;
		line-height: 44px;
		border-radius: 5px;
		background-color: rgba(58, 117, 197, 100);
		color: rgba(255, 255, 255, 100);
		font-size: 16px;
		text-align: center;
		boder: 1px solid rgba(58, 117, 197, 100);
	}

	.search-box-calendar {
		margin-top: 12px;
		display: flex;
		flex: 1;
		justify-content: space-between;
		flex-direction: row;
		height: 44px;
		border-radius: 3px;
		color: rgba(16, 16, 16, 100);
		font-size: 16px;
		text-align: left;
		border: 1px solid rgba(237, 238, 238, 100);

		.iconfont {
			margin-right: 10px;
			display: flex;
			flex: 1;
			justify-content: center;
			align-items: center;
			font-size: 14px;
			line-height: 44px;
		}
	}

	>>> {
		.el-select {
			display: flex;
			flex: 1;
			height: 44px;
			line-height: 23px;
			border-radius: 3px;
			color: rgba(163, 165, 168, 100);
			font-size: 16px;
			text-align: left;
			border: 1px solid rgba(237, 238, 238, 100);
		}

		.van-cell {
			line-height: 23px;
			border-radius: 3px;
			color: rgba(163, 165, 168, 100);
			font-size: 16px;
			text-align: left;
		}

		.van-cell::after {
			border-bottom: none;
		}

		.el-input__inner {
			display: flex;
			flex: 1;
			height: 44px;
			line-height: 23px;
			border-radius: 3px;
			font-size: 16px;
			text-align: left;
			border: none;
		}

		.el-select-dropdown__item {
			color: rgba(163, 165, 168, 100);
		}
	}
</style>
