'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CATEGORIAS, type CategoriaProducto } from '@/types'

export default function CatalogFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const categoriaActual = searchParams.get('categoria') ?? 'todas'
  const [buscar, setBuscar] = useState(searchParams.get('buscar') ?? '')

  const handleSearch = useCallback((valor: string) => {
    setBuscar(valor)
    const params = new URLSearchParams(searchParams.toString())
    if (valor) {
      params.set('buscar', valor)
    } else {
      params.delete('buscar')
    }
    router.push(`/catalogo?${params.toString()}`, { scroll: false })
  }, [router, searchParams])

  const setCategoria = useCallback(
    (cat: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (cat === 'todas') {
        params.delete('categoria')
      } else {
        params.set('categoria', cat)
      }
      router.push(`/catalogo?${params.toString()}`, { scroll: false })
    },
    [router, searchParams]
  )

  return (
    <div className="flex flex-col gap-4">
      {/* Búsqueda */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-rose-400" />
        <Input
          placeholder="Buscar por nombre o descripción..."
          value={buscar}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 border-rose-200 rounded-full"
        />
        {buscar && (
          <button
            onClick={() => handleSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-rose-400 hover:text-rose-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Categorías */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={categoriaActual === 'todas' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setCategoria('todas')}
          className={
            categoriaActual === 'todas'
              ? 'rounded-full bg-rose-500 hover:bg-rose-600'
              : 'rounded-full border-rose-200 text-rose-700 hover:bg-rose-50'
          }
        >
          Todas
        </Button>
        {CATEGORIAS.map((cat: CategoriaProducto) => (
          <Button
            key={cat}
            variant={categoriaActual === cat ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCategoria(cat)}
            className={
              categoriaActual === cat
                ? 'rounded-full bg-rose-500 hover:bg-rose-600'
                : 'rounded-full border-rose-200 text-rose-700 hover:bg-rose-50'
            }
          >
            {cat}
          </Button>
        ))}
      </div>
    </div>
  )
}
