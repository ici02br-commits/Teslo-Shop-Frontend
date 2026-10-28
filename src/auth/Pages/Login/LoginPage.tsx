import { useZustandAuth } from "@/auth/zustand/auth.zustand"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, type SubmitEvent } from "react"
import { Link, useNavigate } from "react-router"
import { toast } from "sonner"


function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
    </svg>
  )
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  )
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}

const LoginPage =()=> {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const {login} = useZustandAuth()


  /*const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simular autenticación
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    console.log("[v0] Login attempt:", { email })
  }*/

  const handleSocialLogin = (provider: string) => {
    console.log("[v0] Social login with:", provider)
  }

  const handleLogin = async(e:SubmitEvent<HTMLFormElement>)=>{
    e.preventDefault()
    setIsLoading(true)
    

      const isValid = await login(email,password)
      if(isValid){
        navigate('/')
        return
      } 

      toast.error('correo o contraseña erroneo')
      
      setIsLoading(false)
  }


  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-xl">
        <CardHeader className="space-y-3 pb-6">
          <div className="flex justify-center mb-2">
            <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center">
              <svg
                className="h-6 w-6 text-primary-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center text-foreground">
            Bienvenido de nuevo
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground text-base">
            Inicia sesión para continuar con tu cuenta
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Formulario de login */}
          <form onSubmit={(e)=> handleLogin(e)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Correo electrónico
              </Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 px-4 bg-secondary border-border focus:border-primary focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                  Contraseña
                </Label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 px-4 bg-secondary border-border focus:border-primary focus:ring-primary"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Iniciando sesión...
                </span>
              ) : (
                "Iniciar sesión"
              )}
            </Button>
          </form>

          {/* Separador */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-card px-4 text-muted-foreground">
                O continúa con
              </span>
            </div>
          </div>

          {/* Botones de autenticación social */}
          <div className="grid grid-cols-3 gap-3">
            <Button
              type="button"
              variant="outline"
              className="h-12 border-border hover:bg-secondary transition-colors"
              onClick={() => handleSocialLogin("apple")}
            >
              <AppleIcon className="h-5 w-5" />
              <span className="sr-only">Iniciar sesión con Apple</span>
            </Button>

            <Button
              type="button"
              variant="outline"
              className="h-12 border-border hover:bg-secondary transition-colors"
              onClick={() => handleSocialLogin("google")}
            >
              <GoogleIcon className="h-5 w-5" />
              <span className="sr-only">Iniciar sesión con Google</span>
            </Button>

            <Button
              type="button"
              variant="outline"
              className="h-12 border-border hover:bg-secondary transition-colors"
              onClick={() => handleSocialLogin("github")}
            >
              <GithubIcon className="h-5 w-5" />
              <span className="sr-only">Iniciar sesión con GitHub</span>
            </Button>
          </div>

          {/* Enlace de contraseña olvidada */}
          <div className="text-center pt-2">
            <button
              type="button"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
              onClick={() => console.log("[v0] Forgot password clicked")}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          {/* Enlace para crear cuenta */}
          <div className="text-center text-sm text-muted-foreground">
            ¿No tienes una cuenta?{" "}
           <Link to='/auth/register'>
               <button
                  type="button"
                  className="cursor-pointer font-semibold text-foreground hover:underline underline-offset-4"
                  onClick={() => console.log("[v0] Sign up clicked")}
                >
              Regístrate
            </button>
          </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


export default LoginPage
