import Link from 'next/link'
import Image from 'next/image'
import { getConfig, getProductos } from '@/lib/appsscript'
import HeroSection from '@/components/public/HeroSection'
import FadeUp from '@/components/public/FadeUp'
import ProductCardEditorial from '@/components/public/ProductCardEditorial'

export const revalidate = 3600

const stripPoints = [
  {
    num: '01',
    titulo: 'Flores Siempre Frescas',
    desc: 'Seleccionamos cada flor con cuidado para garantizar la máxima frescura en cada arreglo.',
  },
  {
    num: '02',
    titulo: 'Diseño Artesanal',
    desc: 'Cada arreglo es una obra única, creada a mano con amor y atención al detalle.',
  },
  {
    num: '03',
    titulo: 'Entrega Especial',
    desc: 'Llevamos tu arreglo con el mismo cuidado con que fue creado, directo a quien lo merece.',
  },
]

const testimonios = [
  {
    texto: 'Los arreglos son simplemente hermosos. Jacky tiene una habilidad especial para capturar exactamente lo que quieres expresar.',
    nombre: 'María José',
    inicial: 'M',
    color: '#FF8C00',
  },
  {
    texto: 'Pedí un arreglo para el cumpleaños de mi mamá y quedó encantada. La calidad y frescura de las flores es increíble.',
    nombre: 'Carlos Rodríguez',
    inicial: 'C',
    color: '#00C4F0',
  },
  {
    texto: 'Para nuestra boda Jacky creó algo mágico. Cada detalle fue perfecto y las flores duraron muchísimo tiempo.',
    nombre: 'Ana & Roberto',
    inicial: 'A',
    color: '#FF1B6D',
  },
]

const galeriaImages = [
  {
    src: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?w=800&auto=format&fit=crop&q=80',
    alt: 'Arreglo floral principal',
  },
  {
    src: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600&auto=format&fit=crop&q=80',
    alt: 'Ramo de flores',
  },
  {
    src: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600&auto=format&fit=crop&q=80',
    alt: 'Flores decorativas',
  },
  {
    src: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop&q=80',
    alt: 'Arreglo de bodas',
  },
  {
    src: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&auto=format&fit=crop&q=80',
    alt: 'Flores frescas',
  },
  {
    src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&auto=format&fit=crop&q=80',
    alt: 'Bouquet artesanal',
  },
]

export default async function HomePage() {
  const [config, productos] = await Promise.all([getConfig(), getProductos()])
  const destacados = productos.filter((p) => p.destacado).slice(0, 6)

  return (
    <div>
      <HeroSection config={config} />

      {/* Seccion de puntos fuertes */}
      <section className="px-6 py-20 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-3">
            {stripPoints.map((item, idx) => (
              <FadeUp key={idx} delay={idx * 100}>
                <div className="rounded-xl border-2 border-rose-100 p-8 hover:border-rose-300 hover:shadow-lg transition-all">
                  <p className="font-playfair text-6xl font-black text-rose-200">{item.num}</p>
                  <h3 className="mt-4 font-playfair text-2xl font-bold text-gray-900">
                    {item.titulo}
                  </h3>
                  <p className="mt-3 text-gray-600">{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Productos destacados */}
      {destacados.length > 0 && (
        <section className="px-6 py-24 md:px-12" style={{ backgroundColor: '#FFF5F8' }}>
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-4 font-playfair text-5xl font-black text-gray-900">
              Nuestros Favoritos
            </h2>
            <p className="mb-16 max-w-2xl text-gray-600">
              Selección especial de nuestros productos más bellos y demandados
            </p>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {destacados.map((p) => (
                <FadeUp key={p.id}>
                  <ProductCardEditorial producto={p} whatsapp={config?.whatsapp || "+"} />
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Banner editorial — Nuestra historia */}
      <section className="px-6 py-24 md:px-12" style={{ backgroundColor: '#FFF5F8' }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-14 md:grid-cols-2">

            {/* Imagen con badge flotante */}
            <FadeUp>
              <div className="relative">
                <div
                  className="relative aspect-[4/5] overflow-hidden"
                  style={{ borderRadius: '24px' }}
                >
                  <Image
                    src="/jackyPagina.jpg"
                    alt="Nuestra historia"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                {/* Badge dato clave flotante */}
                <div
                  className="absolute bottom-6 right-6 rounded-2xl px-5 py-4 shadow-2xl"
                  style={{ backgroundColor: '#FF1B6D' }}
                >
                  <span className="block font-playfair font-black text-3xl text-white">3+</span>
                  <span
                    className="block font-nunito text-xs font-bold text-white"
                    style={{ opacity: 0.9 }}
                  >
                    años creando
                  </span>
                </div>
              </div>
            </FadeUp>

            {/* Texto + lista de features */}
            <FadeUp delay={150}>
              <p className="mb-3 font-dancing text-2xl" style={{ color: '#FF1B6D' }}>
                Nuestra historia
              </p>
              <h2
                className="mb-6 font-playfair font-black text-4xl leading-tight md:text-5xl"
                style={{ color: '#1A0A14' }}
              >
                Pasión que florece en cada{' '}
                <span className="italic" style={{ color: '#FF1B6D' }}>
                  creación
                </span>
              </h2>
              <p
                className="mb-8 font-nunito text-base font-semibold leading-relaxed"
                style={{ color: 'rgba(26,10,20,0.62)' }}
              >
                Jacky es una emprendedora apasionada, inspirada desde pequeña en el amor por la
                naturaleza. Cada arreglo que crea es más que flores: es una obra de arte llena de
                emociones, diseñada para transmitir amor, alegría y gratitud.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span
                    className="mt-1 inline-block h-3 w-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: '#FF1B6D' }}
                  />
                  <div>
                    <h3 className="font-playfair font-bold text-gray-900">Misión</h3>
                    <p className="text-sm text-gray-600">
                      Crear momentos memorables a través de arreglos florales únicos que expresen los
                      sentimientos más profundos.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span
                    className="mt-1 inline-block h-3 w-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: '#FF1B6D' }}
                  />
                  <div>
                    <h3 className="font-playfair font-bold text-gray-900">Visión</h3>
                    <p className="text-sm text-gray-600">
                      Ser la floristería de referencia en la región, reconocida por la calidad,
                      innovación y el amor que ponemos en cada creación.
                    </p>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Galería */}
      <section className="px-6 py-24 md:px-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 font-playfair text-5xl font-black text-gray-900">
            Galería de Inspiración
          </h2>
          <p className="mb-16 max-w-2xl text-gray-600">
            Cada foto cuenta una historia de amor, celebración y belleza
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {galeriaImages.map((img, idx) => (
              <FadeUp key={idx} delay={idx * 50}>
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="px-6 py-24 md:px-12" style={{ backgroundColor: '#1A0A14' }}>
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 font-playfair text-4xl font-black text-white md:text-5xl">
            Lo que dicen nuestros clientes
          </h2>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {testimonios.map((testimonial, idx) => (
              <FadeUp key={idx} delay={idx * 100}>
                <div className="rounded-xl border border-white border-opacity-10 bg-white bg-opacity-5 p-8 backdrop-blur-sm">
                  <p className="mb-6 font-nunito text-white">{testimonial.texto}</p>
                  <div className="flex items-center gap-4">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-full text-white font-playfair font-bold text-lg"
                      style={{ backgroundColor: testimonial.color }}
                    >
                      {testimonial.inicial}
                    </div>
                    <p className="font-playfair font-bold text-white">{testimonial.nombre}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="px-6 py-20 md:px-12">
        <div className="mx-auto max-w-4xl rounded-2xl p-12 md:p-16" style={{ backgroundColor: '#FF1B6D' }}>
          <h2 className="mb-4 font-playfair text-4xl font-black text-white md:text-5xl">
            ¿Listo para crear algo especial?
          </h2>
          <p className="mb-8 text-lg text-white text-opacity-90">
            Contáctanos hoy y déjanos ayudarte a expresar tus sentimientos con flores
          </p>
          <Link
            href="/catalogo"
            className="inline-block rounded-lg bg-white px-8 py-4 font-semibold text-rose-600 hover:bg-opacity-90 transition-all"
          >
            Ver catálogo completo
          </Link>
        </div>
      </section>
    </div>
  )
}
