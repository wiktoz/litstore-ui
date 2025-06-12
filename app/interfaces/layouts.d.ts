interface LayoutInterface {
    children: React.ReactNode
    params: Promise<{ locale: string }>
}