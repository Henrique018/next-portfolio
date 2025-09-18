'use client';

import { useSearchParams } from 'next/navigation';
import { PaginationProps } from '@/services/projectsApi/types';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from './ui/pagination';

type DynamicPaginationProps = {
  pagination: PaginationProps;
  className?: string;
};

export const DynamicPagination = ({ pagination, className }: DynamicPaginationProps) => {
  const searchParams = useSearchParams();

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    return `?${params.toString()}`;
  };

  const renderPaginationItems = () => {
    const items = [];
    const { currentPage, totalPages } = pagination;

    items.push(
      <PaginationItem key={1}>
        <PaginationLink
          href={createPageUrl(1)}
          isActive={currentPage === 1}
          className={currentPage === 1 ? 'bg-primary text-white' : ''}
        >
          1
        </PaginationLink>
      </PaginationItem>,
    );

    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <PaginationItem key={page}>
          <PaginationLink
            href={createPageUrl(page)}
            isActive={currentPage === page}
            className={currentPage === page ? 'bg-primary text-white' : ''}
          >
            {page}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    if (currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }

    if (totalPages > 1) {
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            href={createPageUrl(totalPages)}
            isActive={currentPage === totalPages}
            className={currentPage === totalPages ? 'bg-primary text-white' : ''}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return items;
  };

  if (pagination.totalPages <= 1) {
    return null;
  }

  return (
    <Pagination className={className}>
      <PaginationContent>{renderPaginationItems()}</PaginationContent>
    </Pagination>
  );
};
