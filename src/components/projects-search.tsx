'use client';

import debounce from 'debounce';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

import { Textfield } from '@/components/ui/textfield';
import { Button } from '@/components/ui/button';
import { SearchIcon } from '@/icons/search';
import { siteConfig } from '@/config/content';

export const ProjectsSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const categories = useMemo(() => Object.entries(siteConfig.validCategories) || [], []);

  const query = useMemo(() => {
    return params.get('query') || '';
  }, [params]);

  const selectedCategory = useMemo(() => {
    return params.get('category') || '';
  }, [params]);

  const [searchQuery, setSearchQuery] = useState(query);
  const [category, setCategory] = useState<string>(selectedCategory);
  const [isInitialized, setIsInitialized] = useState(false);

  const navigateWithParams = useCallback(
    (searchParams: URLSearchParams) => {
      try {
        const queryString = searchParams.toString();
        const currentHash = window.location.hash;

        const newPath = queryString
          ? `${pathname}?${queryString}${currentHash}`
          : `${pathname}${currentHash}`;
        router.push(newPath, { scroll: false });
      } catch (error) {
        console.error('Error updating URL:', error);
      }
    },
    [pathname, router],
  );

  const updateURL = useCallback(
    (newQuery?: string, newCategory?: string) => {
      const searchParams = new URLSearchParams(params.toString());
      const currentCategory = params.get('category') || '';

      const queryValue = newQuery !== undefined ? newQuery : searchQuery;
      const categoryValue = newCategory !== undefined ? newCategory : category;

      if (newQuery !== undefined) {
        searchParams.delete('page');
      }

      if (newCategory !== undefined && newCategory !== currentCategory) {
        searchParams.delete('page');
      }

      if (queryValue) {
        searchParams.set('query', queryValue);
      } else {
        searchParams.delete('query');
      }

      if (categoryValue) {
        searchParams.set('category', categoryValue);
      } else {
        searchParams.delete('category');
      }

      navigateWithParams(searchParams);
    },
    [params, searchQuery, category, navigateWithParams],
  );

  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        const searchParams = new URLSearchParams(params.toString());

        searchParams.delete('page');

        if (query) {
          searchParams.set('query', query);
        } else {
          searchParams.delete('query');
        }

        navigateWithParams(searchParams);
      }, 500),
    [params, navigateWithParams],
  );

  useEffect(() => {
    setSearchQuery(query);
    setCategory(selectedCategory);
    setIsInitialized(true);
  }, [query, selectedCategory]);

  const handleUpdateCategory = useCallback(
    (cat: string) => {
      const newCategory = cat === category ? '' : cat;
      setCategory(newCategory);
      updateURL(undefined, newCategory);
    },
    [category, updateURL],
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchQuery(value);
      if (isInitialized) {
        debouncedSearch(value);
      }
    },
    [debouncedSearch, isInitialized],
  );

  return (
    <form
      role="search"
      className="flex w-full flex-col items-center justify-between gap-4 md:flex-row md:gap-6"
      aria-label="Buscar e filtrar postagens"
    >
      <div className="flex flex-1 flex-col items-center gap-4 lg:flex-row">
        <h2
          className="font-chakra-petch text-lg font-bold text-primary lg:text-2xl"
          id="search-heading"
        >
          Minhas postagens
        </h2>

        <Textfield
          name="query"
          type="search"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Buscar..."
          className="max-w-[320px]"
          aria-label="Buscar postagens"
          aria-describedby="search-heading"
          adornment={{
            right: <SearchIcon aria-hidden="true" />,
          }}
        />
      </div>

      {categories.length > 0 && (
        <div className="flex flex-col items-center gap-4 lg:flex-row">
          <p className="font-bold text-primary" id="categories-label">
            Categorias:
          </p>

          <div
            className="flex max-w-[500px] flex-wrap justify-center gap-2"
            role="group"
            aria-labelledby="categories-label"
          >
            {categories.map(([key, val]) => (
              <Button
                key={key}
                onClick={() => handleUpdateCategory(key)}
                variant={category === key ? 'outlined' : 'primary'}
                aria-label={`Filtrar por categoria ${key}`}
                aria-pressed={category === key}
              >
                {val}
              </Button>
            ))}
          </div>
        </div>
      )}
    </form>
  );
};
