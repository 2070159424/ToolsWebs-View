<script>
export default {
	name: 'Header',
	data() {
		return {
			time: ''
		}
	},
	mounted() {
		this.time = new Date().toLocaleString()//加载完页面后执行
		setInterval(() => {
			this.time = new Date().toLocaleString()
		}, 1000)//设置周期执行
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
				<el-link href="/A1" :underline="false" class="maxSize">文字转图片</el-link>
			</el-menu-item>
			<el-menu-item index="2-2">
				<el-link href="/A2" :underline="false" class="maxSize">随机抽签</el-link>
			</el-menu-item>
			<el-menu-item index="2-3">
				<el-link href="/A3" :underline="false" class="maxSize">端口连接性测试</el-link>
			</el-menu-item>
			<el-menu-item index="2-4">
				<el-link href="/A4" :underline="false" class="maxSize">Markdown文档预览</el-link>
			</el-menu-item>
			<el-menu-item index="2-5">
				<el-link href="/A5" :underline="false" class="maxSize">简易二维码生成</el-link>
			</el-menu-item>
			<el-menu-item index="2-6">
				<el-link href="/A6" :underline="false" class="maxSize">文件/Base64互转</el-link>
			</el-menu-item>
			<el-menu-item index="2-7">
				<el-link href="/A7" :underline="false" class="maxSize">UUID生成</el-link>
			</el-menu-item>
		</el-sub-menu>
		<el-menu-item index="3">{{ time }}</el-menu-item>
	</el-menu>
</template>

<style scoped>
.maxSize {
	width: 100%;
	height: 100%;
}
</style>