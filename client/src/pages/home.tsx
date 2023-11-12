import { Inter } from 'next/font/google'
import {authControllerGetSessionInfo, authControllerSignIn, authControllerSignUp} from "@/shared/api/generated";
import { useQuery } from '@tanstack/react-query';
import { UIButton } from '@/shared/ui/ui-button';

const inter = Inter({ subsets: ['latin'] })

export function Home() {

  const {data} = useQuery({
    queryKey: ['session'],
    queryFn: () => authControllerGetSessionInfo(),
  })

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      {data?.email}
      <UIButton variant="primary">
        Primary
      </UIButton>
      <UIButton variant="secondary">
        Secondary
      </UIButton>
      <UIButton variant="outlined">
        Outlined
      </UIButton>
      <UIButton variant="primary" disabled>
        Primary-dis
      </UIButton>
    </main>
  )
}
