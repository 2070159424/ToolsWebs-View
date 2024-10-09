<script>
import QRCodeStyling from "qr-code-styling";

export default {
	name: 'A5',
	data() {
		return {
			fileReader: new FileReader(),
			QRCode: '',
			/** <p>绘制方式。预选值：'canvas' | 'svg'</p>
			 * <p>此处禁用svg方式</p>
			 * */
			type: 'canvas',
			/** 二维码整体形状。预选值：'square'(方形) | 'circle'(圆形)
			 *
			 * */
			shape: 'square',//整体形状。预选值：'square'|'circle'
			/** 二维码尺寸 */
			width: 84,
			height: 84,
			/** 二维码边距，限制最大值为高或宽中最小值的一半 */
			margin: 0,
			/** 要编码的数据，需要经过计算属性toUTF8处理 */
			data: 'Hello, QRCode',
			/** 上传的文件。使用Base64存储图像数据 */
			image: '',//上传图像，限制格式为png、jpg、jpeg。
			qrOptions: {
				/** 二维码版本。预选值(0表示自动选择)：0-40 */
				typeNumber: 0,
				/** 编码模式。此处固定选择Byte模式。预选值：
				 * <p>Numeric：仅数字</p>
				 * <p>Alphanumeric：数字+字母</p>
				 * <p>Byte：任意数据。</p>
				 * <p>Kanji：日文汉字。</p>
				 * */
				mode: 'Byte',
				/** 错误纠正能力。可以理解为被覆盖多大面积的情况下仍然有效。预选值：
				 * <p>'L':7%</p>
				 * <p>'M':15%</p>
				 * <p>'Q':25%</p>
				 * <p>'H':30%</p>
				 * */
				errorCorrectionLevel: 'H'
			},
			imageOptions: {
				/** 设置图像下是否生成点。 */
				hideBackgroundDots: true,
				/** 图片尺寸。越小越好。限制最大值为0.5。 */
				imageSize: 0.4,
				/** 图片边距。限制最大值为二维码宽高的20%*/
				margin: 0
			},
			dotsOptions: {
				/** 点样式。预选值如下：
				 * <p>dots：常规点</p>
				 * <p>rounded：圆形点</p>
				 * <p>classy：优雅风格点</p>
				 * <p>classy-rounded：优雅风格的圆形点</p>
				 * <p>square：方形点</p>
				 * <p>extra-rounded：额外圆形的点</p>
				 * */
				type: 'square',
				color: '#000000'
			},
			cornersSquareOptions: {
				/** 角落方块边框样式。预选值如下：
				 * <p>dot：角落使用小圆点样式。</p>
				 * <p>square：角落使用方形样式。</p>
				 * <p>extra-rounded：角落使用额外圆滑的样式，具有更加圆润的边角。</p>
				 * */
				type: 'square',
				color: '#000000'
			},
			cornersDotOptions: {
				/** 角落方块内样式。预选值如下：
				 * <p>dot：角落使用小圆点样式。</p>
				 * <p>square：角落使用方形样式。</p>
				 * <p>extra-rounded：角落使用额外圆滑的样式，具有更加圆润的边角。</p>
				 * */
				type: 'square',
				color: '#000000'
			},
			backgroundOptions: {
				/** 背景颜色 */
				color: '#ffffff'
			},
			download: {
				/** 下载的文件名称 */
				name: 'QRCode-' + new Date().getTime().toString(),
				/** 下载的格式。可选格式：svg、png、jpeg、webp*/
				extension: 'png'
			}
		}
	},
	methods: {
		draw() {
			document.getElementById('O5-qrcode').innerHTML = ''//清除内容，避免重复绘制
			this.QRCode = new QRCodeStyling({
				type: this.type,
				shape: this.shape,
				width: this.width,
				height: this.height,
				margin: this.margin,
				data: this.toUTF8,
				image: this.image,
				qrOptions: {
					typeNumber: this.qrOptions.typeNumber,
					mode: this.qrOptions.mode,
					errorCorrectionLevel: this.qrOptions.errorCorrectionLevel
				},
				imageOptions: {
					hideBackgroundDots: this.imageOptions.hideBackgroundDots,
					imageSize: this.imageOptions.imageSize,
					margin: this.imageOptions.margin
				},
				dotsOptions: {
					type: this.dotsOptions.type,
					color: this.dotsOptions.color,
				},
				cornersSquareOptions: {
					type: this.cornersSquareOptions.type,
					color: this.cornersSquareOptions.color,
				},
				cornersDotOptions: {
					type: this.cornersDotOptions.type,
					color: this.cornersDotOptions.color,
				},
				backgroundOptions: {
					color: this.backgroundOptions.color,
				}
			})
			this.QRCode.append(document.getElementById('O5-qrcode'))
		},
		downloadFile() {
			this.QRCode.download(this.download)
		}
	},
	watch: {
		type() {
			this.draw()
		},
		shape() {
			this.draw()
		},
		width() { //当更改二维码尺寸时判断边距是否过大，过大时自动缩小。
			const maxMargin = Math.floor((this.width > this.height ? this.height : this.width) / 2)
			this.margin = this.margin > maxMargin ? maxMargin : this.margin
			this.imageOptions.margin = this.imageOptions.margin > Math.floor(maxMargin / 10) ? Math.floor(maxMargin / 10) : this.imageOptions.margin
			this.draw()
		},
		height() {
			const maxMargin = Math.floor((this.width > this.height ? this.height : this.width) / 2)
			this.margin = this.margin > maxMargin ? maxMargin : this.margin
			this.imageOptions.margin = this.imageOptions.margin > Math.floor(maxMargin / 10) ? Math.floor(maxMargin / 10) : this.imageOptions.margin
			this.draw()
		},
		margin() {
			this.draw()
		},
		data() {
			this.draw()
		},
		"qrOptions.typeNumber"() {
			this.draw()
		},
		"qrOptions.mode"() {
			this.draw()
		},
		"qrOptions.errorCorrectionLevel"() {
			this.draw()
		},
		"imageOptions.hideBackgroundDots"() {
			this.draw()
		},
		"imageOptions.imageSize"() {
			this.draw()
		},
		"imageOptions.margin"() {
			this.draw()
		},
		"dotsOptions.type"() {
			this.draw()
		},
		"dotsOptions.color"() {
			this.draw()
		},
		"cornersSquareOptions.type"() {
			this.draw()
		},
		"cornersSquareOptions.color"() {
			this.draw()
		},
		"cornersDotOptions.type"() {
			this.draw()
		},
		"cornersDotOptions.color"() {
			this.draw()
		},
		"backgroundOptions.color"() {
			this.draw()
		}
	},
	computed: {
		/**
		 * <p>将字符串转码为UTF-8编码</p>
		 *
		 * @return {string} 返回转码后的文本
		 * */
		toUTF8() {
			let out = '';
			for (let i = 0; i < this.data.length; i++) {
				let c = this.data.charCodeAt(i);
				if (c < 0x80) {
					out += String.fromCharCode(c);
				} else if (c < 0x800) {
					out += String.fromCharCode(0xC0 | (c >> 6));
					out += String.fromCharCode(0x80 | (c & 0x3F));
				} else if (c < 0x10000) {
					out += String.fromCharCode(0xE0 | (c >> 12));
					out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
					out += String.fromCharCode(0x80 | (c & 0x3F));
				}
			}
			return out;
		}
	},
	mounted() {
		this.draw()
		document.getElementById('O5-ImageUpload').addEventListener('change', (event) => {
			const file = event.target.files[0]
			if (file) {
				this.fileReader.onload = (e) => {
					this.image = e.target.result
					this.draw()
				}
				this.fileReader.readAsDataURL(file)//以Base64形式读取图像文件
			}
		})
	}
}
</script>

<template>
	<div>
		<el-form label-width="auto" style="width: 60%;margin: 0 auto;display: flex">
			<el-form label-width="auto" style="width: 60%">
				<el-form-item label="绘制方式">
					<el-radio-group v-model="type" disabled>
						<el-radio value="canvas">canvas</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="整体形状">
					<el-radio-group v-model="shape">
						<el-radio value="square">方形</el-radio>
						<el-radio value="circle">圆形</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="宽度">
					<el-input-number v-model="width" :step="1" :min="84"></el-input-number>
				</el-form-item>
				<el-form-item label="高度">
					<el-input-number v-model="height" :step="1" :min="84"></el-input-number>
				</el-form-item>
				<el-form-item label="边距">
					<el-input-number v-model="margin" :step="1" :min="0" :max="Math.floor((width>height?height:width)/2)"></el-input-number>
				</el-form-item>
				<el-form-item label="数据">
					<el-input type="textarea" v-model="data"></el-input>&nbsp;&nbsp;<el-text type="info" size="small">存储信息较多时建议增加二维码尺寸</el-text>
				</el-form-item>
				<el-form-item label="图像">
					<input id="O5-ImageUpload" type="file" accept=".png,.jpg,.jpeg">
				</el-form-item>
				<el-collapse>
					<el-collapse-item title="二维码选项">
						<el-form-item label="版本">
							<el-input-number v-model="qrOptions.typeNumber" :min="0" :max="40" disabled></el-input-number>&nbsp;&nbsp;<el-text type="info" size="small">自动选择</el-text>
						</el-form-item>
						<el-form-item label="模式">
							<el-select v-model="qrOptions.mode" disabled>
								<el-option label="仅数字" value="Numeric"></el-option>
								<el-option label="数字和字母" value="Alphanumeric"></el-option>
								<el-option label="任意数据" value="Byte"></el-option>
								<el-option label="日文汉字" value="Kanji"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="错误纠正">
							<el-select v-model="qrOptions.errorCorrectionLevel">
								<el-option label="低（7%）" value="L"></el-option>
								<el-option label="中（15%）" value="M"></el-option>
								<el-option label="高（25%）" value="Q"></el-option>
								<el-option label="最高（30%）" value="H"></el-option>
							</el-select>
						</el-form-item>
					</el-collapse-item>
				</el-collapse>
				<el-collapse>
					<el-collapse-item title="图像选项">
						<el-form-item label="隐藏背景">
							<el-switch v-model="imageOptions.hideBackgroundDots" size="small"></el-switch>&nbsp;&nbsp;<el-text type="info" size="small">图像下是否生成点，当图像透明时可避免点影响图片</el-text>
						</el-form-item>
						<el-form-item label="图片尺寸">
							<el-input-number v-model="imageOptions.imageSize" :min="0" :max="0.5" :step="0.01"></el-input-number>
						</el-form-item>
						<el-form-item label="图片边距">
							<el-input-number v-model="imageOptions.margin" :min="0" :max="Math.floor((width>height?height:width)/20)" :step="1"></el-input-number>
						</el-form-item>
					</el-collapse-item>
				</el-collapse>
				<el-collapse>
					<el-collapse-item title="点选项">
						<el-form-item label="样式">
							<el-select v-model="dotsOptions.type">
								<el-option label="常规点" value="dots"></el-option>
								<el-option label="圆形点" value="rounded"></el-option>
								<el-option label="优雅风格点" value="classy"></el-option>
								<el-option label="优雅风格圆形点" value="classy-rounded"></el-option>
								<el-option label="方形点" value="square"></el-option>
								<el-option label="额外圆形的点" value="extra-rounded"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="颜色">
							<el-color-picker v-model="dotsOptions.color"></el-color-picker>
						</el-form-item>
					</el-collapse-item>
				</el-collapse>
				<el-collapse>
					<el-collapse-item title="角落边框选项">
						<el-form-item label="样式">
							<el-select v-model="cornersSquareOptions.type">
								<el-option label="小圆点" value="dot"></el-option>
								<el-option label="方形" value="square"></el-option>
								<el-option label="额外圆滑" value="extra-rounded"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="颜色">
							<el-color-picker v-model="cornersSquareOptions.color"></el-color-picker>
						</el-form-item>
					</el-collapse-item>
				</el-collapse>
				<el-collapse>
					<el-collapse-item title="角落内样式">
						<el-form-item label="样式">
							<el-select v-model="cornersDotOptions.type">
								<el-option label="小圆点" value="dot"></el-option>
								<el-option label="方形" value="square"></el-option>
								<el-option label="额外圆滑" value="extra-rounded"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="颜色">
							<el-color-picker v-model="cornersDotOptions.color"></el-color-picker>
						</el-form-item>
					</el-collapse-item>
				</el-collapse>
				<el-collapse>
					<el-collapse-item title="背景选项">
						<el-form-item label="颜色">
							<el-color-picker v-model="backgroundOptions.color"></el-color-picker>
						</el-form-item>
					</el-collapse-item>
				</el-collapse>
				<el-button type="primary" @click="draw">绘制</el-button>
			</el-form>
			<el-form style="width: 40%;text-align: center;height: 100%;position: sticky;top: 10px">
				<el-alert title="注意" type="info">生成的二维码请自行测试是否可用。颜色设置可能会导致无法识别，建议使用默认颜色</el-alert>
				<br>
				<div id="O5-qrcode" style="width: 100%;height: 100%;"></div>
				<el-select v-model="download.extension" style="width: 25%;">
					<el-option label="png" value="png"></el-option>
					<el-option label="svg" value="svg"></el-option>
					<el-option label="jpeg" value="jpeg"></el-option>
					<el-option label="webp" value="webp"></el-option>
				</el-select>
				<el-button type="primary" @click="downloadFile">下载</el-button>
			</el-form>
		</el-form>
	</div>
</template>
<!--设置图片大小在页面显示的最大大小，不会影响到下载的图片大小-->
<style scoped>
#O5-qrcode * {
	max-width: 100%;
	max-height: 100%;
	position: sticky;
}
</style>