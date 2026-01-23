import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Spinner } from '@/components/ui/spinner';

interface EmptyLoadingProps {
  spinning?: boolean;
  canCancel?: boolean;
}

export function EmptyLoading({
  spinning = false,
  canCancel = false,
}: EmptyLoadingProps) {
  return (
    <Empty className="w-full">
      <EmptyHeader>
        {spinning && (
          <EmptyMedia variant="icon">
            <Spinner />
          </EmptyMedia>
        )}
        <EmptyTitle>Грузим данные</EmptyTitle>
        <EmptyDescription>
          Пожалуйста, подождите пока мы загрузим данные. Не обновляйте страницу.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        {canCancel && (
          <Button variant="outline" size="sm">
            Отменить
          </Button>
        )}
      </EmptyContent>
    </Empty>
  );
}
