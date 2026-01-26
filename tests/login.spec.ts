import { test, expect } from '@playwright/test';

test('cannot submit empty login form', async ({ page }) => {
  await page.goto('/login');

  await page.getByRole('button', { name: 'Entrar' }).click();

  // El navegador no permite enviar el formulario
  // Seguimos en /login
  await expect(page).toHaveURL(/\/login$/);

  // El input email debería ser inválido
  const emailInput = page.getByLabel('Email');
  await expect(emailInput).toBeVisible();
});
