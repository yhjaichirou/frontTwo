<template>
	<div class="box">
		<div class="top">
			<div class="title">微山港航服务中心</div>
			<div class="during">2020-7-1至2021-7-1</div>
			<div class="nums">
				<div class="checkNum">
					<div class="tit">查询次数</div>
					<div class="num">10</div>
				</div><div class="checkNum">
					<div class="tit">查询次数</div>
					<div class="num1">10</div>
				</div>
			</div>
		</div>
		<div class="top" style="margin-top: 15px;">
			<div class="lists">
				<div class="list-item">
					<div class="item-title">统计</div>
					<div class="item-y">本年</div>
					<div class="item-m">本月</div>
					<div class="item-d">本日</div>
				</div>
				<div class="list-item" v-for="(item,k) in datas.list" :key="k">
					<div class="item-title">{{item.name}}</div>
					<div class="item-y">{{item.year}}</div>
					<div class="item-m">{{item.month}}</div>
					<div class="item-d">{{item.day}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['datas']
	}
</script>

<style lang="stylus" scoped>
	.box{
		background-color: #f7f7f7;
		padding: 15px;
		box-sizing: border-box;
		.top{
			background-color #FFFFFF;
			padding :15px;
			border-radius : 5px;
			box-shadow: 0px 0px 9px #ccc;
			.title{
				text-align: center;
				font-size: 20px;
				margin-top: 20px;
				line-height 30px
			}
			.during{
				font-size :16px;
				text-align center
			}
			.nums{
				padding 30px 15px 0
				display flex
				justify-content space-around
				align-items center
				.checkNum{
					text-align center
					.tit{
						font-size 16px
					}
					.num{
						font-size 24px
						font-weight 700
					}
					.num1{
						font-size 24px
						font-weight 700
						color cadetblue
					}
				}
			}
			.list-item{
				display flex
				align-items center
				padding 10px
				font-size 14px
				.item-title{
					flex 40%
				}
				.item-y,.item-m,.item-d{
					flex 20%
					text-align center
					font-size 12px
					color #666
				}
				
			}
			.list-item:nth-child(1){
				.item-title{
					font-size 14px
					font-weight 700
				}
			}
			.list-item:nth-child(2n-1){
				background-color #f7f7f7
			}
		}
	}
</style>
