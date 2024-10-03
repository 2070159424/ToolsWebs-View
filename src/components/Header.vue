<script>
export default {
	name: 'Header',
	data() {
		return {
			time: ''
		}
	},
	methods: {
		updateTime() {
			const now = new Date()
			this.time = now.toLocaleTimeString()
		}
	},
	mounted() {
		this.updateTime()
		setInterval(this.updateTime, 1000)
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
				<el-link href="/O1" :underline="false" class="aSize">文字转图片</el-link>
			</el-menu-item>
			<el-menu-item index="2-2">
				<el-link href="/O2" :underline="false" class="aSize">随机抽签</el-link>
			</el-menu-item>
			<el-menu-item index="2-3">
				<el-link href="/O3" :underline="false" class="aSize">端口连接性测试</el-link>
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