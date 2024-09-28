<script>
export default {
	name: 'O2',
	data() {
		return {
			dataLists: [],
			randomDataList: [],
			separator: '',
			count: 1
		}
	},
	methods: {
		/**
		 * @param {Array} arr 传递的待选列表
		 * @param {Number} count 指定随机选择的个数
		 * @return {Array} 返回随机选择的列表
		 * */
		randomSelect(arr, count) {
			//Knuth 洗牌算法
			for (let i = arr.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[arr[i], arr[j]] = [arr[j], arr[i]];
			}
			this.randomDataList = arr.slice(0, count > arr.length ? arr.length : count)
		},
		Select() {
			this.randomSelect(this.dataLists.split(this.separator === '' ? '\n' : this.separator), this.count)
		}
	}
}
</script>

<template>
	<div>
		<el-form label-width="auto" style="max-width: 600px;margin: 0 auto">
			<el-form-item label="输入列表">
				<el-input type="textarea" v-model="dataLists"></el-input>
			</el-form-item>
			<el-form-item label="分隔符">
				<el-input v-model="separator" style="width: 50px;"></el-input>&nbsp;&nbsp;<el-text type="info">可变长分隔符。默认回车。注意文本中只能存在一种分隔符</el-text>
			</el-form-item>
			<el-form-item label="选取个数">
				<el-input-number v-model="count" style="width: 100px;"></el-input-number>
			</el-form-item>
			<div style="width: 600px;text-align: center">
				<el-button type="primary" @click="Select">随机选择</el-button>
				<br>
				<p>{{ randomDataList.toString() }}</p>
				<el-alert title="输入示例" type="info" style="text-align: left">
					"张三，李四，王五，赵六"&nbsp;&nbsp;&nbsp;分隔符为"，"（即逗号）
				</el-alert>
			</div>
		</el-form>
	</div>
</template>

<style scoped>

</style>