import string

COMMON_PASSWORDS = [
    '123456', '246810', 'hello', 'welcome', 'tryagain',
    'abc123', 'password1', 'admin', '123456789', 'letmein'
]

def check_common(password):
    not_common = password not in COMMON_PASSWORDS
    return not_common

def check_length(password):
    length_okay = len(password) >= 8
    return length_okay

def check_upper(password):
    has_upper = any(c.isupper() for c in password)
    return has_upper

def check_number(password):
    has_digit = any(c.isdigit() for c in password)
    return has_digit

def check_symbol(password):
    has_symbol = any(c in string.punctuation for c in password)
    return has_symbol

def check_strength(password):
    score = 100
    missing = []
    verdict = ''
    
    check_common(password)
    check_length(password)
    check_upper(password)
    check_number(password)
    check_symbol(password)

    if not check_common(password):
        score -= 40
        missing.append("Unique Password")
    if not check_length(password):
        score -= 20
        missing.append("Longer Password")
    if not check_upper(password):
        score -= 10
        missing.append("Uppercase letter")
    if not check_number(password):
        score -=10
        missing.append("A digit in the password")
    if not check_symbol(password):
        score -= 10
        missing.append("A symbol in the password")
    
    if 'Unique Password' in missing:
        verdict += ' You need a unique password.'
    if 'Longer Password' in missing:
        verdict += ' Your password is too short. Try a longer password.'
    if 'Uppercase letter' in missing:
        verdict += ' A better password always has an uppercase letter which makes it harder for breaking.'
    if 'A digit in the password' in missing:
        verdict += ' It would be an awesome password if there was a digit in it.'
    if 'A symbol in the password' in missing:
        verdict += ' A special character in your password would make it great.'


    final =f"\nPassword: {password}. \n\nLength = {len(password)}. \n\nScore = {score} out of 100. \n\nVerdict: {verdict}"

    print(final)

def main():
    print("🔏Vault Check🔏")
    inputpassword = input("Enter your password to check if it is secure. 😉 ")
    userpassword = inputpassword
    
    check_strength(userpassword)

main()