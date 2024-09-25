<script>
export default {
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
			<el-link href="/O1" :underline="false">
				<el-menu-item index="2-1">文字转图片</el-menu-item>
			</el-link>
		</el-sub-menu>
		<el-menu-item index="3">{{ time }}</el-menu-item>
	</el-menu>
</template>

<style scoped>

</style>