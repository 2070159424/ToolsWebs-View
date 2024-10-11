<script>
export default {
	name: 'A7',
	data() {
		return {
			count: 1
		}
	},
	methods: {
		create() {
			document.getElementById('A7-container').innerHTML = ''
			for (let i = 0; i < this.count; i++) {
				const element = document.createElement('span');
				element.innerText = crypto.randomUUID() + '\n'
				document.getElementById('A7-container').appendChild(element)
			}
		},
		download() {
			const url = URL.createObjectURL(new Blob([document.getElementById('A7-container').innerText]));
			const a = document.createElement('a');
			a.href = url;
			a.download = new Date().getTime().toString();
			a.click()
			URL.revokeObjectURL(url)
		}
	}
}
</script>

<template>
	<el-container>
		<el-aside width="40%"/>
		<el-aside width="30%">
			<el-form label-width="auto">
				<el-form-item label="生成个数">
					<el-input-number v-model="count" :min="1" :step="1" :step-strictly="true"/>
				</el-form-item>
				<el-form-item>
					<el-button @click="create" type="primary">生成</el-button>&nbsp;&nbsp;<el-button @click="download" type="success">下载</el-button>
				</el-form-item>
				<el-form-item>
					<el-text type="info" size="small">
						注：个数过多可能会卡顿，请稍候或减少个数
						<hr style="height: 1px;color: black;width: 100%">
					</el-text>
					<div id="A7-container" style="line-height: normal;font-family: fangsong"></div>
				</el-form-item>
			</el-form>
		</el-aside>
		<el-aside width="30%"/>
	</el-container>
</template>

<style scoped>
</style>