<script>
export default {
	props: {
		book: { type: Object, required: true },
	},
};
</script>

<template>
	<div>
		<div class="p-1">
			<strong>Tựa:</strong>
			{{ book.title }}
		</div>
		<div class="p-1">
			<strong>Tác giả:</strong>
			{{ book.author }}
		</div>
		<div class="p-1">
			<strong>Năm xuất bản:</strong>
			{{ book.publishDate }}
		</div>
		<div class="p-1">
			<strong>Nhà xuất bản:</strong>
			{{ book.publisher }}
		</div>
		<div class="p-1">
			<strong>Thể loại:</strong>
			{{ book.category }}
		</div>
		<div class="p-1">
			<strong>Sách yêu thích:&nbsp;</strong>
			<i v-if="book.favorite" class="fas fa-check"></i>
			<i v-else class="fas fa-times"></i>
		</div>
	</div>
</template>
