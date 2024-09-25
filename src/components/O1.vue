<!--文字转图片-->
<script>
export default {
	data() {
		return {
			text: '文本',
			color: '#000000',
			font: 'fangsong',
			fontSize: 16,
			sizeX: 400,
			sizeY: 200,
			x: 100,
			y: 100
		}
	},
	methods: {
		draw() {
			const canvas = this.$refs.canvas.getContext('2d');
			canvas.clearRect(0, 0, this.sizeX, this.sizeY)
			canvas.font = String(this.fontSize + 'px ' + this.font)
			canvas.fillStyle = this.color.toString()
			canvas.fillText(this.text, this.x, this.y)
		}
	},
	watch: {
		text() {
			this.draw()
		},
		color() {
			this.draw()
		},
		font() {
			this.draw()
		},
		fontSize() {
			this.draw()
		},
		sizeX() {
			this.draw()
		},
		sizeY() {
			this.draw()
		},
		x() {
			this.draw()
		},
		y() {
			this.draw()
		}
	}
}
</script>

<template>
	<div>
		<el-form label-width="auto" style="max-width: 400px;margin: 0 auto">
			<el-form-item label="图片尺寸">
				<el-input-number :min="1" :step="1" v-model="sizeX"></el-input-number>
				X
				<el-input-number :min="1" :step="1" v-model="sizeY"></el-input-number>
			</el-form-item>
			<el-form-item label="文本">
				<el-input v-model="text"></el-input>
			</el-form-item>
			<el-form-item label="颜色">
				<el-color-picker v-model="color"></el-color-picker>
			</el-form-item>
			<el-form-item label="字体">
				<el-select v-model="font">
					<el-option value="serif">serif</el-option>
					<el-option value="sans-serif">sans-serif</el-option>
					<el-option value="monospace">monospace</el-option>
					<el-option value="cursive">cursive</el-option>
					<el-option value="fantasy">fantasy</el-option>
					<el-option value="system-ui">system-ui</el-option>
					<el-option value="ui-serif">ui-serif</el-option>
					<el-option value="ui-sans-serif">ui-sans-serif</el-option>
					<el-option value="ui-monospace">ui-monospace</el-option>
					<el-option value="ui-rounded">ui-rounded</el-option>
					<el-option value="math">math</el-option>
					<el-option value="emoji">emoji</el-option>
					<el-option value="fangsong">fangsong</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="字体大小">
				<el-input-number :min="1" :step="1" v-model="fontSize"></el-input-number>
			</el-form-item>
			<el-form-item label="文字位置">
				<el-input-number :min="1" :step="1" v-model="x"></el-input-number>
				X
				<el-input-number :min="1" :step="1" v-model="y"></el-input-number>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" style="margin: 0 auto" @click="draw">绘制</el-button>
			</el-form-item>
		</el-form>
		<div style="text-align: center">
			<canvas ref="canvas" :width="sizeX" :height="sizeY" style="border: 1px solid black"></canvas>
		</div>
	</div>
</template>

<style scoped>

</style>