<script>
import MarkdownIt from "markdown-it";
import 'github-markdown-css/github-markdown.css'

export default {
	name: 'A4',
	data() {
		return {
			markdownIt: new MarkdownIt(),
			fileReader: new FileReader(),
			/** 文档源码 */
			sourcecode: '# 一级标题'
		}
	},
	methods: {
		/**
		 * 渲染文档基本形式。样式由github-markdown-css提供。
		 * */
		markdownHTML() {
			document.getElementById('A4-show').innerHTML = this.markdownIt.render(this.sourcecode)
		},
		/**
		 * 下载输入框中的代码。默认命令为Markdown-时间戳.md
		 * */
		fileDownload() {
			const url = URL.createObjectURL(new Blob([this.sourcecode], {type: 'text/plain'}))
			const a = document.createElement('a')
			a.href = url
			a.download = 'Markdown-' + String(new Date().getTime()) + '.md'
			a.click()
			URL.revokeObjectURL(url)
		}
	},
	mounted() {
		this.markdownHTML()
		document.getElementById('A4-file').addEventListener('change', (event) => {
			const file = event.target.files[0];
			if (file) {
				this.fileReader.onload = (e) => {
					this.sourcecode = e.target.result
					this.markdownHTML()
				}
				this.fileReader.readAsText(file)
			}
			event.target.value = null
		})
	}
}
</script>

<template>
	<el-container>
		<el-aside width="5%"/>
		<el-aside width="35%">
			<el-form label-width="auto" id="A4-form">
				<el-form-item label="源码">
					<el-input id="A4-input" type="textarea" v-model="sourcecode" @input="markdownHTML" :rows="20"></el-input>
				</el-form-item>
				<el-form-item label="读取文件" style="width: fit-content">
					<input id="A4-file" type="file" accept=".md,.markdown">
					<el-button id="A4-fileDownload" type="primary" @click="fileDownload">下载</el-button>
				</el-form-item>
				<el-form-item>
					<el-alert type="info" title="仅支持Markdown文档的预览以及在源码上进行修改，编写请使用专业软件"></el-alert>
				</el-form-item>
			</el-form>
		</el-aside>
		<el-aside width="10%"/>
		<el-aside width="45%">
			<el-scrollbar :height="document.getElementById('A4-form').style.height">
				<el-text id="A4-show" class="markdown-body"/>
			</el-scrollbar>
		</el-aside>
		<el-aside width="5%"/>
	</el-container>
</template>

<style scoped>
</style>