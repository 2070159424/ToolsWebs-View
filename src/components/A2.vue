<script>
export default {
	name: 'A2',
	data() {
		return {
			/** 原始数据 */
			dataLists: [],
			/** 处理后的数据 */
			randomDataList: [],
			/** 自定义分隔符，默认为'\n' */
			separator: '',
			/** 选取个数，默认选择一个 */
			count: 1
		}
	},
	methods: {
		/**
		 * <p>抽签函数</p>
		 *
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
		/** 调用前面的抽签函数。根据分隔符分割数据 */
		Select() {
			this.randomSelect(this.dataLists.split(this.separator === '' ? '\n' : this.separator), this.count)
		}
	}
}
</script>

<template>
	<el-container>
		<el-aside width="30%"/>
		<el-main>
			<el-form label-width="auto">
				<el-form-item label="输入列表">
					<el-input type="textarea" v-model="dataLists"></el-input>
					<el-text type="info">输入示例："张三，李四，王五，赵六"&nbsp;&nbsp;&nbsp;分隔符为"，"（即逗号）</el-text>
				</el-form-item>
				<el-form-item label="分隔符">
					<el-input v-model="separator" style="width: 50px;"></el-input>&nbsp;&nbsp;<el-text type="info">可变长分隔符。默认回车。注意文本中只能存在一种分隔符</el-text>
				</el-form-item>
				<el-form-item label="选取个数">
					<el-input-number v-model="count" style="width: 100px;"></el-input-number>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="Select" style="margin: 0 auto">随机选择</el-button>
				</el-form-item>
				<el-form-item>
					<el-text style="margin: 0 auto">{{ randomDataList.toString() }}</el-text>
				</el-form-item>
			</el-form>
		</el-main>
		<el-aside width="30%"/>
	</el-container>
</template>

<style scoped>
</style>