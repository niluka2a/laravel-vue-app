<template>
  <Modal title="Edit user" description="Update user details and save changes." @close="$emit('close')">
    <UserEditForm :user="user" @saved="emitSaved" />
  </Modal>
</template>

<script setup>
import Modal from '@/components/Modal.vue';
import UserEditForm from '@/pages/users/components/UserEditForm.vue';

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['close', 'saved']);

function emitSaved() {
  emit('saved');
}
</script>
