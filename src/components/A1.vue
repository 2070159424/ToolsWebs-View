<script>
export default {
	name: 'A1',
	data() {
		return {
			/** 要绘制的文本 */
			text: '文本',
			/** 文本颜色 */
			color: '#000000',
			/** 字体 */
			font: 'fangsong',
			/** 字体大小 */
			fontSize: 16,
			/** 画布大小 */
			sizeX: 400,
			/** 画布大小 */
			sizeY: 200,
			/** 文字位置 */
			x: 100,
			/** 文字位置 */
			y: 100,
		}
	},
	methods: {
		/** 根据参数绘制图像 */
		draw() {
			const canvas = this.$refs.canvas.getContext('2d');
			canvas.clearRect(0, 0, this.sizeX, this.sizeY) //清除文本，避免重复绘制导致重影问题
			canvas.font = String(this.fontSize + 'px ' + this.font) //设置字体大小和颜色
			canvas.fillStyle = this.color.toString() //设置字体颜色
			canvas.fillText(this.text, this.x, this.y) //填充文字
		}
	},
	watch: {
		text: 'draw',
		color: 'draw',
		font: 'draw',
		fontSize: 'draw',
		sizeX: 'draw',
		sizeY: 'draw',
		x: 'draw',
		y: 'draw'
	},
	mounted() {
		this.draw()
	}
}
</script>

<template>
	<el-container>
		<el-aside width="20%"/>
		<el-aside width="30%">
			<el-form label-width="auto">
				<el-form-item label="图片尺寸">
					<el-input-number :min="1" :step="1" v-model="sizeX"/>
					&nbsp;X&nbsp;
					<el-input-number :min="1" :step="1" v-model="sizeY"/>
				</el-form-item>
				<el-form-item label="文本">
					<el-input type="textarea" v-model="text" :rows="5"/>
				</el-form-item>
				<el-form-item label="颜色">
					<el-color-picker v-model="color"/>
				</el-form-item>
				<el-form-item label="字体">
					<el-select v-model="font">
						<el-option label="serif" value="serif"/>
						<el-option label="sans-serif" value="sans-serif"/>
						<el-option label="monospace" value="monospace"/>
						<el-option label="cursive" value="cursive"/>
						<el-option label="fantasy" value="fantasy"/>
						<el-option label="system-ui" value="system-ui"/>
						<el-option label="ui-serif" value="ui-serif"/>
						<el-option label="ui-sans-serif" value="ui-sans-serif"/>
						<el-option label="ui-monospace" value="ui-monospace"/>
						<el-option label="ui-rounded" value="ui-rounded"/>
						<el-option label="math" value="math"/>
						<el-option label="emoji" value="emoji"/>
						<el-option label="fangsong" value="fangsong"/>
					</el-select>
				</el-form-item>
				<el-form-item label="字体大小">
					<el-input-number :min="1" :step="1" v-model="fontSize"/>
				</el-form-item>
				<el-form-item label="文字位置">
					<el-input-number :min="1" :step="1" v-model="x"/>
					&nbsp;X&nbsp;
					<el-input-number :min="1" :step="1" v-model="y"/>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" style="margin: 0 auto" @click="draw">绘制</el-button>
				</el-form-item>
			</el-form>
		</el-aside>
		<el-main>
			<div style="text-align: center">
				<el-text type="info" size="small">右键下载即可</el-text>
				<br>
				<canvas ref="canvas" :width="sizeX" :height="sizeY" style="border: 1px solid black"></canvas>
			</div>
		</el-main>
		<el-aside width="10%"/>
	</el-container>
</template>

<style scoped>
</style>