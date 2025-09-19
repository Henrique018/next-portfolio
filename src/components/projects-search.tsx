'use client';

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

  const updateURL = useCallback(
    (newQuery?: string, newCategory?: string) => {
      try {
        const searchParams = new URLSearchParams(params.toString());
        const currentCategory = params.get('category') || '';

        const queryValue = newQuery !== undefined ? newQuery : searchQuery;
        const categoryValue = newCategory !== undefined ? newCategory : category;

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
    [params, searchQuery, category, pathname, router],
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

  useEffect(() => {
    if (!isInitialized) return;

    const timeoutId = setTimeout(() => {
      updateURL(searchQuery);
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, updateURL, isInitialized]);

  return (
    <form
      role="search"
      className="flex w-full flex-col items-center justify-between gap-4 md:flex-row md:gap-6"
      onSubmit={(e) => e.preventDefault()}
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
          onChange={(e) => {
            const q = e.target.value;
            setSearchQuery(q);
          }}
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
