<script>
export default {
	props: {
		books: { type: Array, default: [] },
		activeIndex: { type: Number, default: -1 },
	},
	emits: ["update:activeIndex"],
	methods: {
		updateActiveIndex(index) {
			this.$emit("update:activeIndex", index);
		},
	},
};
</script>

<template>
	<ul class="list-group">
		<li
			class="list-group-item"
			v-for="(book, index) in books"
			:class="{ active: index === activeIndex }"
			:key="book._id"
			@click="updateActiveIndex(index)"
		>
			{{ book.title }}
		</li>
	</ul>
</template>
