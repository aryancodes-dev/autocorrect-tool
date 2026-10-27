"""Autocorrect Tool v20 ADVANCED — Project #03 of the 100+ AI Projects series.
Same logic as the web version (app.js): Levenshtein distance + common-misspellings map,
plus v20 advanced fixes: split words, double words, lone "i" -> "I", sentence capitals,
spacing after punctuation, collapsed double spaces.
Run:  python autocorrect.py
Modes: 1 = single word, 2 = sentence, 3 = interactive sentence loop.
No internet, no account needed.
"""
import re

WORDS = set("""
the be to of and a in that it was for on are as with his they at this have from or one had by word but not what all were we when your can said there use an each which she do how their if will up other about out many then them these so some her would make like him into time has look two more write go see number no way could people my than first water been call who oil its now find long down day did get come made may part over new sound take only little work know place year live me back give most very after thing our just name good sentence man think say great where help through much before line right too mean old any same tell boy follow came want show also around form three small set put end does another well large must big even such because turn here why ask went men read need land different home us move try kind hand picture again change off play spell air away animal house point page letter mother answer found study still learn should world high every near add food between own below country plant last school father keep tree never start city earth eye light thought head under story saw left few while along might close something seem next hard open example begin life always those both paper together got group often run important until children side feet car mile night walk white sea began grow took river four carry state once book hear stop without second later miss idea enough eat face watch far real almost let above girl sometimes mountains cut young talk soon list song leave family body music color stand sun questions fish area mark dog horse birds problem complete room knew since ever piece told usually friends easy heard order red door sure become top ship across today during short better best however low hours black products happened whole measure remember early waves reached listen wind rock space covered fast several hold himself toward five step morning passed vowel true hundred against pattern numeral table north slowly money map busy pulled draw voice seen cold cried plan notice south sing war ground fall king town ill unit figure certain field travel wood fire upon done english road halt ten fly gave box finally wait correct oh quickly person became shown minutes strong verb stars front feel fact inches street decided contain course surface produce building ocean class note nothing rest carefully scientists inside wheels stay green known island week less machine base ago plane system behind ran round boat game force brought understand warm common bring explain dry though language shape deep thousands yes clear equation yet government filled heat full hot check object am among
receive address tomorrow definitely separate writing friend school college computer python javascript program project student teacher exam question answer study learn book library science mathematics english history geography physics chemistry biology technology internet mobile phone laptop keyboard mouse screen window door table chair house family mother father brother sister happy sad beautiful important different because people children woman women man men child day night morning evening today yesterday week month year time place world country india delhi kolkata mumbai chennai bangalore hyderabad
i is am hello hi going went come came get got take took see saw know knew think thought say said tell told ask asked work worked play played live lived love loved like liked want wanted need needed help helped try tried call called keep kept feel felt leave left put set cut run ran walk walked talk talked look looked use used find found give gave make made
""".split())

MISSPELL = {
    "recieve": "receive", "receieve": "receive", "adress": "address", "addres": "address",
    "tommorow": "tomorrow", "definately": "definitely", "seperate": "separate",
    "occurr": "occur", "occured": "occurred", "writting": "writing", "freind": "friend",
    "teh": "the", "thier": "their", "beleive": "believe", "acheive": "achieve",
    "neccessary": "necessary", "accomodate": "accommodate", "enviroment": "environment",
    "goverment": "government", "independant": "independent", "experiance": "experience",
    "knowlege": "knowledge", "libary": "library", "grammer": "grammar",
    "untill": "until", "comming": "coming", "studing": "studying", "langauge": "language",
    "compiter": "computer", "schol": "school", "collage": "college", "studnet": "student",
    "wich": "which", "wen": "when", "thay": "they", "taht": "that", "hte": "the", "nad": "and",
    "abuot": "about", "becasue": "because", "becuase": "because", "importent": "important",
    "diffrent": "different", "succes": "success", "sucess": "success", "bussiness": "business",
    "peice": "piece", "wierd": "weird", "doesnt": "doesn't", "dont": "don't",
    "cant": "can't", "wont": "won't", "isnt": "isn't", "didnt": "didn't",
}
SPLIT_WORDS = {"alot": "a lot", "infront": "in front", "atleast": "at least", "incase": "in case"}


def levenshtein(a, b):
    m, n = len(a), len(b)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            dp[i][j] = min(dp[i - 1][j] + 1, dp[i][j - 1] + 1,
                           dp[i - 1][j - 1] + (0 if a[i - 1] == b[j - 1] else 1))
    return dp[m][n]


def suggestions(word, limit=5):
    w = word.lower()
    if not w:
        return []
    if w in MISSPELL:
        return [MISSPELL[w]]
    if len(w) <= 1:
        return []  # never "correct" a single letter like i / a
    if w in WORDS:
        return []
    max_dist = 1 if len(w) <= 4 else 2
    out = []
    for d in WORDS:
        if abs(len(d) - len(w)) > max_dist:
            continue
        dist = levenshtein(w, d)
        if dist <= max_dist:
            out.append((dist, d))
    out.sort()
    return [d for _, d in out[:limit]]


def match_case(original, corrected):
    if original.isupper() and len(original) > 1:
        return corrected.upper()
    if original and original[0].isupper():
        return corrected[0].upper() + corrected[1:]
    return corrected


def correct_word(raw):
    lower = raw.lower()
    if lower in WORDS:
        return raw
    sug = suggestions(lower, 1)
    return match_case(raw, sug[0]) if sug else raw


def advanced_fixes(text, changes):
    out = text
    def split_repl(m):
        f = SPLIT_WORDS[m.group(0).lower()]
        changes.append(f"{m.group(0)} -> {f}")
        return f
    out = re.sub(r"\b(alot|infront|atleast|incase)\b", split_repl, out, flags=re.I)
    def double_repl(m):
        changes.append(f'double word "{m.group(0)}" -> "{m.group(1)}"')
        return m.group(1)
    out = re.sub(r"\b([A-Za-z]+)\s+\1\b", double_repl, out, flags=re.I)
    out = re.sub(r"(^|\s)i(\s|[.,!?]|$)", lambda m: m.group(1) + "I" + m.group(2), out)
    out = re.sub(r"([.!?])([A-Za-z])", r"\1 \2", out)
    out = re.sub(r"\s{2,}", " ", out)
    out = re.sub(r"(^\s*[a-z])|([.!?]\s+[a-z])", lambda m: m.group(0).upper(), out)
    return out


def correct_sentence(text, advanced=True):
    changes = []

    def repl(m):
        raw = m.group(0)
        lower = raw.lower()
        if lower in WORDS:
            return raw
        fixed = correct_word(raw)
        if fixed.lower() != lower:
            changes.append(f"{raw} -> {fixed}")
        return fixed

    out = re.sub(r"[A-Za-z']+", repl, text)
    if advanced:
        out = advanced_fixes(out, changes)
    return out, changes


def main():
    print("Autocorrect Tool v20 ADVANCED — by Aryan Kumar Shah")
    print("1 = single word, 2 = sentence, 3 = loop (type 'quit' to exit)")
    mode = input("Choose 1 / 2 / 3: ").strip()
    if mode == "1":
        w = input("Word: ").strip()
        print("Suggestions:", suggestions(w) or "Looks correct.")
        print("Corrected:", correct_word(w))
    elif mode == "2":
        s = input("Sentence: ")
        out, changes = correct_sentence(s)
        print("Corrected:", out)
        print("Changes:", ", ".join(changes) if changes else "No changes.")
    else:
        while True:
            s = input("\nSentence (or 'quit'): ")
            if s.strip().lower() == "quit":
                break
            out, changes = correct_sentence(s)
            print("Corrected:", out)
            if changes:
                print("Changes:", ", ".join(changes))


if __name__ == "__main__":
    main()
