import z from "zod";

export const schemaProjetos = z.object({
  titulo: z.string().min(5, "Titulo Deve ter pelo menos 5 caracteres"),

  slug: z.string().min(1,"O slug é obrigatório"),

  descricao: z.string().min(5, "Descricao Deve ter pelo menos 5 caracteres"),

  skills: z.array(z.string()).min(1,"As skills são obrigatórias"),

  skillsPath: z.array(z.string()).min(1,"O caminho das skills deve ser especificado"),

  photo: z.string().min(1,"A photo é obrigatória"),

  liveUrl: z.string().min(1).url('A URL deve ser válida'),

  githubUrl: z.string().min(1).url('A URL deve ser válida'),
  
});


export const schemaCertificados = z.object({
  titulo: z.string().min(1, 'O título é obrigatório'), 

  descricao: z.string().min(1, 'A descrição é obrigatória'), 

  horas: z.string().min(1, 'As horas são obrigatórias'), 

  slug: z.string().min(1, 'O slug é obrigatório'), 

  url: z.string().url('A URL deve ser válida'), 
  
});

export const schemaUser = z 
    .object({
      name: z.string().min(2, "O nome deve ter no minimo 2 caracteres"),

      email: z.string().email({ message: "Email inválido" }),

      password: z.string().min(6, "A senha deve ter no minimo 6 caracteres"),

      confirmPassword: z
        .string()
        .min(6, "A senha deve ter no minimo 6 caracteres"),

    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "As senhas não são iguais",

      path: ["confirmPassord"],

    });