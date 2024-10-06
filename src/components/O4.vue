<script>
import MarkdownIt from "markdown-it";
import '../assets/github-markdown.min.css'

export default {
	name: 'O4',
	data() {
		return {
			markdownIt: new MarkdownIt(),
			sourcecode: '# 一级标题',
			fileReader: new FileReader()
		}
	},
	methods: {
		markdownHTML() {
			document.getElementById('O4-show').innerHTML = this.markdownIt.render(this.sourcecode)
		},
		fileDownload() {
			const content = this.sourcecode
			const blob = new Blob([content], {type: 'text/plain'})
			const url = URL.createObjectURL(blob)
			const a = document.createElement('a')
			a.href = url
			a.download = 'Markdown-' + String(new Date().getTime()) + '.md'
			a.click()
			document.body.removeChild(a)
			URL.revokeObjectURL(url)
		}
	},
	mounted() {
		this.markdownHTML()
		document.getElementById('O4-file').addEventListener('change', (event) => {
			const file = event.target.files[0];
			if (file) {
				this.fileReader.onload = (e) => {
					this.sourcecode = e.target.result
					this.markdownHTML()
				}
				this.fileReader.readAsText(file)
			}
		})
	}
}
</script>

<template>
	<div>
		<el-form label-width="auto" style="max-width: 600px;margin: 0 auto">
			<el-form-item label="源码">
				<el-input id="O4-input" type="textarea" v-model="sourcecode" @input="markdownHTML" :rows="20"></el-input>
			</el-form-item>
			<el-form-item label="文件操作" style="width: fit-content">
				<input id="O4-file" type="file" accept=".md,.markdown">
				<el-button id="O4-fileDownload" type="primary" @click="fileDownload">下载</el-button>
			</el-form-item>
			<el-form-item>
				<el-alert type="info" title="仅支持Markdown文档的预览以及在源码上进行修改，编写请使用专业软件"></el-alert>
			</el-form-item>
			<el-form-item>
				<div id="O4-show" class="markdown-body"></div>
			</el-form-item>
		</el-form>
	</div>
</template>

<style scoped>

</style>