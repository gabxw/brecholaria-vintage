-- Script para corrigir políticas RLS da tabela user_roles
-- Execute este script no SQL Editor do Supabase

-- Remover políticas antigas
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;

-- Criar política para usuários autenticados verem suas próprias roles
-- Esta política permite que o hook useAuth funcione corretamente
CREATE POLICY "Authenticated users can view their own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Criar política para admins gerenciarem todas as roles
CREATE POLICY "Admins can manage all roles"
ON public.user_roles FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Verificar se as políticas foram criadas
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE tablename = 'user_roles'
ORDER BY policyname;
