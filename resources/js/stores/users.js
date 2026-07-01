import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import * as userService from '../services/userService';

export const useUsersStore = defineStore('users', () => {
  const users = ref([]);
  const pagination = ref({ current_page: 1, last_page: 1 });
  const selectedUser = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const userCount = computed(() => users.value.length);
  const hasMore = computed(() => pagination.value.current_page < pagination.value.last_page);

  async function fetchUsers(page = 1) {
    loading.value = true;
    error.value = null;

    try {
      const response = await userService.fetchUsers(page);
      
      if (page > 1) {
        users.value = [...users.value, ...(response.data || [])];
      } else {
        users.value = response.data || [];
      }
      
      pagination.value = response.meta || pagination.value;
    } catch (err) {
      error.value = err.message || 'Failed to load users.';
    } finally {
      loading.value = false;
    }
  }

  async function fetchUser(id) {
    loading.value = true;
    error.value = null;

    try {
      const response = await userService.fetchUser(id);
      selectedUser.value = response.data || null;
    } catch (err) {
      error.value = err.message || 'Failed to load user.';
    } finally {
      loading.value = false;
    }
  }

  async function createUser(payload) {
    loading.value = true;
    error.value = null;

    try {
      const response = await userService.createUser(payload);
      
      if (response.data) {
        users.value = [response.data, ...users.value];
      }
      
      return response.data;
    } catch (err) {
      error.value = err.message || 'Failed to create user.';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function updateUser(id, payload) {
    loading.value = true;
    error.value = null;

    try {
      const response = await userService.updateUser(id, payload);
      
      if (response.data) {
        users.value = users.value.map((user) => (user.id === id ? response.data : user));

        if (selectedUser.value?.id === id) {
          selectedUser.value = response.data;
        }
      }

      return response.data;
    } catch (err) {
      error.value = err.message || 'Failed to update user.';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return {
    users,
    selectedUser,
    pagination,
    loading,
    error,
    userCount,
    hasMore,
    fetchUsers,
    fetchUser,
    createUser,
    updateUser,
  };
});
