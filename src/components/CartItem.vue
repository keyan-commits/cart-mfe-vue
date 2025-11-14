<template>
  <div class="cart-item">
    <div class="item-info">
      <span class="item-icon">{{ item.icon }}</span>
      <div class="item-details">
        <div class="item-name">{{ item.name }}</div>
        <div class="item-price">${{ item.price }}</div>
      </div>
    </div>
    <button @click="$emit('remove')" class="remove-btn">
      ✕
    </button>
  </div>
</template>

<script>
export default {
  name: 'CartItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  emits: ['remove']
};
</script>

<style scoped>
.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 10px;
  margin-bottom: 12px;
  border: 1px solid #e0e0e0;
  transition: all 0.3s;
}

.cart-item:hover {
  background: #f0f0f0;
  border-color: #ccc;
}

.item-info {
  display: flex;
  align-items: center;
  gap: 15px;
  flex: 1;
}

.item-icon {
  font-size: 36px;
}

.item-details {
  flex: 1;
}

.item-name {
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
  font-size: 15px;
}

.item-price {
  color: #4CAF50;
  font-weight: 700;
  font-size: 18px;
}

.remove-btn {
  width: 32px;
  height: 32px;
  padding: 0;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-weight: 700;
  font-size: 18px;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-btn:hover {
  background: #d32f2f;
  transform: scale(1.1);
}
</style>
