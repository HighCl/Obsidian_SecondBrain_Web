import { cp, mkdir, readdir, readFile, writeFile } from "node:fs/promises"
import { join, extname } from "node:path"
import { parseDocument } from "yaml"

const [source, destination] = process.argv.slice(2)
const media = new Set([".avif", ".gif", ".jpeg", ".jpg", ".mp3", ".mp4", ".ogg", ".pdf", ".png", ".webm", ".webp"])
const notes = []

async function stage(path = "") {
  for (const entry of await readdir(join(source, path), { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue
    const file = join(path, entry.name)
    if (entry.isDirectory()) {
      await stage(file)
      continue
    }
    if (!entry.isFile()) continue

    const extension = extname(file).toLowerCase()
    const input = join(source, file)
    if (extension === ".md") {
      const markdown = await readFile(input, "utf8")
      const frontmatter = markdown.match(/^\uFEFF?---[ \t]*\r?\n([\s\S]*?)^(?:---|\.\.\.)[ \t]*(?:\r?\n|$)/m)
      if (frontmatter?.index !== 0) continue
      const properties = parseDocument(frontmatter[1])
      if (properties.errors.length) continue
      const tags = properties.get("tags")
      const values = tags?.items ?? [tags]
      if (!values.some((value) => (value?.value ?? value) === "publish")) continue
      notes.push(file)
    } else if (!media.has(extension)) {
      continue
    }

    await mkdir(join(destination, path), { recursive: true })
    await cp(input, join(destination, file))
  }
}

await mkdir(destination)
await stage()
if (!notes.includes("index.md")) {
  const body = notes.length
    ? "왼쪽 메뉴에서 공유 문서를 열 수 있습니다."
    : "현재 공개 문서가 없습니다."
  await writeFile(join(destination, "index.md"), `---\ntitle: SecondBrain\n---\n\n${body}\n`)
}
console.log(`Staged ${notes.length} explicitly published note(s).`)
