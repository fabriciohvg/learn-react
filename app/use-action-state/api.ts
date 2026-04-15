export async function addToCart(count: number) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return count + 1;
}

export async function removeFromCart(count: number) {
  if (count === 0) {
    return count;
  }

  await new Promise((resolve) => setTimeout(resolve, 500));
  return Math.max(count - 1, 0);
}
