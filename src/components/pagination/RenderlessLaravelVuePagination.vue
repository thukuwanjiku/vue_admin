<script>
export default {
	props: {
		data: {
			type: Object,
			default: () => {
			}
		},

		limit: {
			type: Number,
			default: 0
		},

		showDisabled: {
			type: Boolean,
			default: false
		},

		size: {
			type: String,
			default: 'default',
			validator: value => {
				return ['small', 'default', 'large'].indexOf(value) !== -1
			}
		},

		align: {
			type: String,
			default: 'left',
			validator: value => {
				return ['left', 'center', 'right'].indexOf(value) !== -1
			}
		}
	},

	data: function () {
		return {
			totalPerPage: this.isApiResource ? this.data.meta.per_page : Number(this.data.per_page)
		}
	},

	computed: {
		isApiResource: function () {
			return !!this.data.meta
		},

		currentPage: function () {
			return this.isApiResource ? this.data.meta.current_page : this.data.current_page
		},

		firstPageUrl: function () {
			return this.isApiResource ? this.data.links.first : null
		},

		from: function () {
			return this.isApiResource ? this.data.meta.from : this.data.from
		},

		lastPage: function () {
			return this.isApiResource ? this.data.meta.last_page : this.data.last_page
		},

		lastPageUrl: function () {
			return this.isApiResource ? this.data.links.last : null
		},

		nextPageUrl: function () {
			return this.isApiResource ? this.data.links.next : this.data.next_page_url
		},

		perPage: function () {
			return this.isApiResource ? this.data.meta.per_page : Number(this.data.per_page)
		},

		prevPageUrl: function () {
			return this.isApiResource ? this.data.links.prev : this.data.prev_page_url
		},

		to: function () {
			return this.isApiResource ? this.data.meta.to : this.data.to
		},

		total: function () {
			return this.isApiResource ? this.data.meta.total : this.data.total
		},

		pageRange: function () {
			if (this.limit === -1) {
				return 0
			}
			if (this.limit === 0) {
				return this.lastPage
			}
			let current = this.currentPage
			let last = this.lastPage
			let delta = this.limit
			let left = current - delta
			let right = current + delta + 1
			let range = []
			let pages = []
			let l
			for (let i = 1; i <= last; i++) {
				if (i === 1 || i === last || (i >= left && i < right)) {
					range.push(i)
				}
			}
			range.forEach(function (i) {
				if (l) {
					if (i - l === 2) {
						pages.push(l + 1)
					} else if (i - l !== 1) {
						pages.push('...')
					}
				}
				pages.push(i)
				l = i
			})
			return pages
		},

		perPageOptions: () => Array.from(Array(9).keys()).map(i => 5 + i * 5),

		pages: function () {
			return Array.from(Array(this.lastPage).keys()).map(i => i + 1)
		}
	},

	watch: {
		perPage: function () {
			this.totalPerPage = this.perPage
		}
	},

	emits: ['pagination-change-page'],

	methods: {
		previousPage: function () {
			this.selectPage((this.currentPage - 1), this.perPage)
		},

		nextPage: function () {
            if(this.currentPage >= this.lastPage) {
                return
            }
			this.selectPage((this.currentPage + 1), this.perPage)
		},

		loadMore: function () {
			this.selectPage(this.currentPage, (this.totalPerPage += 10))
		},

		selectPage: function (page, perPage) {
			if (page === '...') {
				return
			}
			this.$emit('pagination-change-page', {page, perPage})
		}
	},

	render: function () {
		return this.$slots.default({
			data: this.data,
			limit: this.limit,
			showDisabled: this.showDisabled,
			size: this.size,
			align: this.align,
			computed: {
				isApiResource: this.isApiResource,
				currentPage: this.currentPage,
				firstPageUrl: this.firstPageUrl,
				from: this.from,
				lastPage: this.lastPage,
				lastPageUrl: this.lastPageUrl,
				nextPageUrl: this.nextPageUrl,
				perPage: this.perPage,
				prevPageUrl: this.prevPageUrl,
				to: this.to,
				total: this.total,
				pageRange: this.pageRange,
				perPageOptions: this.perPageOptions,
				pages: this.pages,
			},
			prevButtonEvents: {
				click: (e) => {
					e.preventDefault()
					this.previousPage()
				}
			},
			nextButtonEvents: {
				click: (e) => {
					e.preventDefault()
					this.nextPage()
				}
			},
			loadMoreEvents: {
				click: (e) => {
					e.preventDefault()
					this.loadMore()
				}
			},
			pageButtonEvents: (page) => ({
				click: (e) => {
					e.preventDefault()
					this.selectPage(page, this.perPage)
				}
			}),
			pageSelectEvents: () => ({
				change: (e) => {
					e.preventDefault()
					this.selectPage(e.target.value, this.perPage)
				}
			}),
			onPerPageEvents: () => ({
				change: (e) => {
					e.preventDefault()
					this.selectPage(1, e.target.value)
				}
			})
		})
	}
}
</script>
