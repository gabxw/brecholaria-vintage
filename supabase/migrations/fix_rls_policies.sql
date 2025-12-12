-- Script para corrigir políticas RLS dos produtos
-- Execute este script no SQL Editor do Supabase

-- Remover políticas antigas (se existirem)
DROP POLICY IF EXISTS "Products are viewable by everyone" ON public.products;
DROP POLICY IF EXISTS "Admins can insert products" ON public.products;
DROP POLICY IF EXISTS "Admins can update products" ON public.products;
DROP POLICY IF EXISTS "Admins can delete products" ON public.products;

-- Recriar políticas corretas
-- Produtos devem ser visíveis para TODOS (incluindo usuários não autenticados)
CREATE POLICY "Products are viewable by everyone"
ON public.products FOR SELECT
USING (true);

-- Apenas admins podem inserir produtos
CREATE POLICY "Admins can insert products"
ON public.products FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Apenas admins podem atualizar produtos
CREATE POLICY "Admins can update products"
ON public.products FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Apenas admins podem deletar produtos
CREATE POLICY "Admins can delete products"
ON public.products FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Verificar se RLS está habilitado
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Verificar políticas criadas
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'products';
