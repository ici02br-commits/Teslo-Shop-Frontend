import { Button } from '@/components/ui/button'

interface Props {
  title:string,
  subtitle:string
}

const CustomJumbotron = ({title, subtitle}:Props) => {
  return (
    <section className="py-10 px-4 lg:px-8 bg-muted/30">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl lg:text-5xl font-light tracking-tight mb-6">
            {title}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>
          <Button size="lg" className="rounded-full px-8">
            Explorar Colección
          </Button>
        </div>
      </section>
  )
}

export default CustomJumbotron
