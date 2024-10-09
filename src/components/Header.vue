<script>
export default {
	name: 'Header',
	data() {
		return {
			time: ''
		}
	},
	methods: {
		/**
		 * <p>头部显示时间</p>
		 * */
		updateTime() {
			const now = new Date()
			this.time = now.toLocaleTimeString()
		}
	},
	mounted() {
		this.updateTime()//加载完页面后执行
		setInterval(this.updateTime, 1000)//设置周期执行
	}
}
</script>

<template>
	<el-menu class="el-menu" mode="horizontal">
		<el-link href="/" :underline="false">
			<el-menu-item index="1">首页</el-menu-item>
		</el-link>
		<el-sub-menu index="2">
			<template #title>功能菜单</template>
			<el-menu-item index="2-1">
				<el-link href="/A1" :underline="false" class="aSize">文字转图片</el-link>
			</el-menu-item>
			<el-menu-item index="2-2">
				<el-link href="/A2" :underline="false" class="aSize">随机抽签</el-link>
			</el-menu-item>
			<el-menu-item index="2-3">
				<el-link href="/A3" :underline="false" class="aSize">端口连接性测试</el-link>
			</el-menu-item>
			<el-menu-item index="2-4">
				<el-link href="/A4" :underline="false" class="aSize">Markdown文档预览</el-link>
			</el-menu-item>
			<el-menu-item index="2-5">
				<el-link href="/A5" :underline="false" class="aSize">简易二维码生成</el-link>
			</el-menu-item>
		</el-sub-menu>
		<el-menu-item index="3">{{ time }}</el-menu-item>
	</el-menu>
</template>

<style scoped>
.aSize {
	width: 100%;
	height: 100%;
}
</style>