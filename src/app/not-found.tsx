import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-4 pt-10 md:px-32 lg:pt-20">
      <h2 className="text-center font-chakra-petch text-2xl font-bold text-primary">
        Ops! A página que você está procurando não foi encontrada.
      </h2>

      <p className="mb-4">Volte ao inicio para continuar navegando no site.</p>

      <Link href="/" className={buttonVariants()}>
        Voltar ao inicio
      </Link>
    </div>
  );
}
