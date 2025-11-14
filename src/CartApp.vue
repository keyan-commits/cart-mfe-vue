<template>
  <div class="cart-app">
    <h2>Shopping Cart</h2>
    <p class="cart-subtitle">{{ cartItems.length }} item{{ cartItems.length !== 1 ? 's' : '' }}</p>
    
    <div v-if="cartItems.length === 0" class="empty-cart">
      <div class="empty-icon">🛒</div>
      <p class="empty-title">Your cart is empty</p>
      <p class="empty-hint">Add some products to get started!</p>
    </div>

    <div v-else class="cart-content">
      <CartItem
        v-for="(item, index) in cartItems"
        :key="index"
        :item="item"
        @remove="removeItem(index)"
      />
      
      <div class="cart-summary">
        <div class="cart-total">
          <span>Total:</span>
          <span class="total-amount">${{ total }}</span>
        </div>

        <button @click="checkout" class="checkout-btn">
          Proceed to Checkout →
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import CartItem from './components/CartItem.vue';

export default {
  name: 'CartApp',
  components: {
    CartItem
  },
  setup() {
    const cartItems = ref([]);

    const total = computed(() => {
      return cartItems.value.reduce((sum, item) => sum + item.price, 0);
    });

    const handleAddToCart = (event) => {
      cartItems.value.push(event.detail);
      
      // Notify other MFEs
      window.dispatchEvent(
        new CustomEvent('cartUpdated', {
          detail: {
            itemCount: cartItems.value.length,
            total: total.value
          }
        })
      );
      
      console.log('✅ Cart updated:', event.detail.name);
    };

    const removeItem = (index) => {
      const removed = cartItems.value[index];
      cartItems.value.splice(index, 1);
      
      window.dispatchEvent(
        new CustomEvent('cartUpdated', {
          detail: {
            itemCount: cartItems.value.length,
            total: total.value
          }
        })
      );
      
      console.log('🗑️ Removed from cart:', removed.name);
    };

    const checkout = () => {
      alert(`🎉 Checkout successful!\n\nTotal: $${total.value}\nItems: ${cartItems.value.length}`);
    };

    onMounted(() => {
      window.addEventListener('addToCart', handleAddToCart);
    });

    onUnmounted(() => {
      window.removeEventListener('addToCart', handleAddToCart);
    });

    return {
      cartItems,
      total,
      removeItem,
      checkout
    };
  }
};
</script>

<style scoped>
.cart-app {
  min-height: 450px;
}

h2 {
  font-size: 24px;
  margin-bottom: 4px;
  color: #333;
  font-weight: 700;
}

.cart-subtitle {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

.empty-cart {
  text-align: center;
  padding: 80px 20px;
}

.empty-icon {
  font-size: 80px;
  margin-bottom: 15px;
  opacity: 0.5;
}

.empty-title {
  font-size: 18px;
  color: #666;
  margin-bottom: 8px;
  font-weight: 600;
}

.empty-hint {
  font-size: 14px;
  color: #999;
}

.cart-content {
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.cart-summary {
  margin-top: 25px;
  padding-top: 20px;
  border-top: 2px solid #e0e0e0;
}

.cart-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.total-amount {
  color: #4CAF50;
  font-size: 28px;
  font-weight: 700;
}

.checkout-btn {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
}

.checkout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
}

.checkout-btn:active {
  transform: translateY(0);
}
</style>